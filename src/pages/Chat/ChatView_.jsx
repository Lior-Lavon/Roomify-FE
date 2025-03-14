import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  MapView,
  Chat,
  PropertyDetailPage,
  TopBar,
  ChatFooter,
} from "../../components";
import { useSelector } from "react-redux";
import { RoomList } from "../../MockData/RoomList";
import { ChatOptions } from "../../MockData/ChatOptions";

const ChatView = () => {
  const [chatFlow, setChatFlow] = useState([]);
  const [processFilters, setProcessFilters] = useState(false);
  const [filterUpdate, setFilterUpdate] = useState(false);

  const { userPrompt } = useSelector((store) => store.chat);
  console.log("userPrompt : ", userPrompt);

  const [chatInfo, setChatInfo] = useState({
    Prompt: "chat.userPrompt",
    Address: "Amsterdam",
    PropertyType: "",
    Radius: 0,
    MinPrice: 0,
    MaxPrice: 0,
    MinSize: 0,
  });

  const bottomContainerRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [showPropertyInfoView, setShowPropertyInfoView] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [visibleCardId, setVisibleCardId] = useState(null);

  const containerRef = useRef(null);
  const isResizingRef = useRef(false);
  const [heights, setHeights] = useState({ top: "40%", bottom: "60%" });

  const [bottomContainerHeight, setBottomContainerHeight] = useState(0);
  // const timeoutId = useRef(null);
  const [activeAdvertArr, setActiveAdvertArr] = useState([]);

  useEffect(() => {
    // get the chat object
    const promptChat = ChatOptions.find((c) => c.type === "PROMPT");
    promptChat.text = chatInfo.Prompt;
    chatFlow.push(promptChat);
    setChatFlow(chatFlow);

    fetchProperties();

    ////////////////////////////////////////////
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (processFilters == true) {
      processNextFilter();
      setProcessFilters(false);
    }
  }, [processFilters, chatFlow]);

  useEffect(() => {
    if (filterUpdate) {
      fetchProperties();
      setFilterUpdate(false);
    }
  }, [filterUpdate]);

  useEffect(() => {
    if (showLoading) {
      // load the data from the server
      setTimeout(() => {
        let chatArray = [...chatFlow];
        // remove loading
        chatArray = chatArray.filter((item) => item.type !== "LOADNING");

        // add propertySearch
        // const searchResultOriginal = ChatOptions.find(
        //   (c) => c.type === "SEARCH_RESULT"
        // );
        // const searchResult = Object.assign({}, searchResultOriginal);
        const searchResult = {
          id: 3,
          type: "SEARCH_RESULT",
          scrollPosition: 0,
        };
        chatArray.push(searchResult);
        setChatFlow(chatArray);

        setProcessFilters(true);
      }, 2000);

      setShowLoading(false);
    }
  }, [showLoading]);

  const processNextFilter = () => {
    setTimeout(() => {
      let charArray = [...chatFlow];
      let filterType = null;

      // check if we need to add new filter
      if (chatInfo.PropertyType == "") {
        filterType = ChatOptions.find((c) => c.type === "PROPERTY_TYPE_FILTER");
      } else if (chatInfo.MaxPrice == 0) {
        filterType = ChatOptions.find((c) => c.type === "PRICE_FILTER");
      } else if (chatInfo.Radius == 0) {
        filterType = ChatOptions.find((c) => c.type === "DISTANCE_FILTER");
      } else if (chatInfo.MinSize == 0) {
        filterType = ChatOptions.find((c) => c.type === "PROPERTY_SIZE_FILTER");
      }
      if (filterType != null) {
        charArray.push(filterType);
        setChatFlow(charArray);
      }
    }, 1500);
  };

  const filterSelection = (filterName, value) => {
    let chatArray = null;

    // remove the question from chatFlow
    chatArray = [...chatFlow];
    chatArray = chatArray.filter((item) => item.type !== filterName);

    switch (filterName) {
      case "PROPERTY_TYPE_FILTER": {
        chatInfo.PropertyType = value;
        setChatInfo(chatInfo);

        // show the answer
        let userFilter = ChatOptions.find((c) => c.type === "FILTER_SELECTION");
        userFilter = { ...userFilter };
        userFilter.text = value;
        chatArray.push(userFilter);

        setChatFlow(chatArray);
        break;
      }
      case "PRICE_FILTER": {
        chatInfo.MaxPrice = value;
        setChatInfo(chatInfo);

        // show the answer
        let userFilter = ChatOptions.find((c) => c.type === "FILTER_SELECTION");
        userFilter = { ...userFilter };
        userFilter.text = `${value} €`;
        chatArray.push(userFilter);

        setChatFlow(chatArray);

        break;
      }
      case "DISTANCE_FILTER": {
        chatInfo.Radius = value;
        setChatInfo(chatInfo);

        // show the answer
        let userFilter = ChatOptions.find((c) => c.type === "FILTER_SELECTION");
        userFilter = { ...userFilter };
        userFilter.text = `${value} Km`;
        chatArray.push(userFilter);

        setChatFlow(chatArray);

        break;
      }
      case "PROPERTY_SIZE_FILTER": {
        chatInfo.MinSize = value;
        setChatInfo(chatInfo);

        // show the answer
        let userFilter = ChatOptions.find((c) => c.type === "FILTER_SELECTION");
        userFilter = { ...userFilter };

        userFilter.text = `${value} m²`;
        chatArray.push(userFilter);

        setChatFlow(chatArray);

        break;
      }
    }
    setFilterUpdate(true);
  };

  const fetchProperties = () => {
    let chatArray = [...chatFlow];

    setTimeout(() => {
      const loadingChatItem = ChatOptions.find((c) => c.type === "LOADNING");
      chatArray.push(loadingChatItem);
      setChatFlow(chatArray);
    }, 1000);

    setShowLoading(true);
  };

  const handleMouseDown = (event) => {
    console.log("handleMouseDown");

    // Optionally prevent body scroll on mobile devices
    document.body.style.overflow = "hidden";

    event.preventDefault();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove, { passive: false });

    document.addEventListener("mouseup", handleMouseUp, { once: true });
    document.addEventListener("touchend", handleMouseUp, { once: true });
  };

  const handleMouseUp = () => {
    console.log("handleMouseUp");
    isResizingRef.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("touchmove", handleMouseMove);

    // Reset body overflow back to normal after dragging ends
    document.body.style.overflow = "auto";
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    if (!isResizingRef.current) return;
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let clientY = 0;
    if (event.touches) {
      clientY = event.touches[0].clientY;
    } else {
      clientY = event.clientY;
    }

    let newTopHeight = clientY - containerRect.top;
    let newBottomHeight = containerRect.height - newTopHeight - 8;

    console.log("111");

    if (newTopHeight > 100 && newBottomHeight > 100) {
      console.log("222");
      setHeights({
        top: `${newTopHeight}px`,
        bottom: `${newBottomHeight}px`,
      });
      setBottomContainerHeight(newBottomHeight);

      // setNewTopHeight(newTopHeight);
      // setNewBottomHeight(newBottomHeight);
    }
  };

  useLayoutEffect(() => {
    // This effect runs after the DOM has been painted, and allows you to measure it
    if (bottomContainerRef.current) {
      setBottomContainerHeight(
        bottomContainerRef.current.getBoundingClientRect().height
      );
    }
  }, []); // Empty dependency array means this runs only once after the first render

  const showPropertyInfo = () => {
    setShowPropertyInfoView(showPropertyInfoView ? false : true);
  };

  const onCardVisible = useCallback((visibleAdvertId) => {
    setVisibleCardId(visibleAdvertId);
  }, []);

  return (
    <div className=" w-full h-screen flex flex-col">
      {/* Top Bar */}
      {/* <div className="h-14 flex items-center justify-center text-white text-lg font-bold">
        Top Bar
      </div> */}
      <TopBar showAvatar={true} showLogin={true} />

      {/* Middle Section */}
      <div className="w-full flex-1 flex flex-col bg-amber-200">
        {/* Top */}
        <div className="w-full" style={{ height: heights.top }}>
          <MapView properties={RoomList} visibleCardId={visibleCardId} />
        </div>

        {/* ChatDiv */}

        <div className="w-full flex-1" ref={bottomContainerRef}>
          <div
            className="w-full h-5 flex flex-col items-center justify-center bg-white"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onClick={() => {
              console.log("click");
            }}
          >
            <div className="w-[2rem] h-[.12rem] bg-gray-400 mx-auto" />
            <div className="w-[1.5rem] h-[.12rem] bg-gray-400 mt-[.1rem] mx-auto" />
          </div>

          <div
            className="w-full flex-1 bg-orange-400"
            style={{ height: `${bottomContainerHeight - 16}px` }}
          >
            <Chat
              chat_flow={chatFlow}
              room_list={RoomList}
              chat_info={chatInfo}
              onCardVisible={onCardVisible}
              filterSelection={filterSelection}
              showPropertyInfo={showPropertyInfo}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="h-12 bg-blue-500 flex items-center justify-center text-white text-lg font-bold">
        Footer
      </div> */}
      <ChatFooter pageType={"chat"} />
    </div>
  );
};

export default ChatView;
