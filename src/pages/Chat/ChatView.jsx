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
  ShareAdvert,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { ChatOptions } from "../../MockData/ChatOptions";
import ChatWithOwner from "../../components/ChatWithOwner/ChatWithOwner";
import { useParams } from "react-router-dom";
import { setReturnToAfterLogin } from "../../features/user/userSlice";

const ChatView = () => {
  const dispatch = useDispatch();
  const [chatFlow, setChatFlow] = useState([]);
  const [processFilters, setProcessFilters] = useState(false);
  const [filterUpdate, setFilterUpdate] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [shareView, setShareView] = useState({ show: false, advertId: 0 });
  const [showAdvertInfo, setShowAdvertInfo] = useState({
    show: false,
    advertId: 0,
  });

  const { returnToAfterLogin } = useSelector((store) => store.user);
  const { roomList } = useSelector((store) => store.chat);

  const [chatInfo, setChatInfo] = useState({
    Prompt: "I am searching for a .....",
    Address: "Amsterdam",
    PropertyType: "",
    Radius: 0,
    MaxPrice: 0,
    MinSize: 0,
  });

  const bottomContainerRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [showLoading, setShowLoading] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);

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
    if (returnToAfterLogin != undefined) {
      setShowAdvertInfo({ show: true, advertId: returnToAfterLogin.advertId });
      if (returnToAfterLogin.showChat) {
        showChatWithOwner(returnToAfterLogin.advertId);
      }
      if (returnToAfterLogin.afterLogin) {
        dispatch(setReturnToAfterLogin(null));
      }
    }
  }, [returnToAfterLogin]);

  useEffect(() => {
    if (showLoading) {
      // load the data from the server
      setTimeout(() => {
        let chatArray = [...chatFlow];
        // remove loading
        chatArray = chatArray.filter((item) => item.type !== "LOADNING");
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
    chatArray = chatArray.filter((item) => item.type !== "SEARCH_RESULT");
    chatArray = chatArray.filter((item) => item.type !== "FILTER_SELECTION");

    switch (filterName) {
      case "PROPERTY_TYPE_FILTER": {
        chatInfo.PropertyType = value;
        setChatInfo(chatInfo);

        // show the answer
        let userFilter = ChatOptions.find((c) => c.type === "FILTER_SELECTION");
        // userFilter = { ...userFilter };
        // userFilter.text = value;
        chatArray.push(userFilter);

        setChatFlow(chatArray);
        break;
      }
      case "PRICE_FILTER": {
        chatInfo.MaxPrice = value;
        setChatInfo(chatInfo);

        // show the answer
        let userFilter = ChatOptions.find((c) => c.type === "FILTER_SELECTION");
        chatArray.push(userFilter);
        setChatFlow(chatArray);

        break;
      }
      case "DISTANCE_FILTER": {
        chatInfo.Radius = value;
        setChatInfo(chatInfo);

        // show the answer
        let userFilter = ChatOptions.find((c) => c.type === "FILTER_SELECTION");
        chatArray.push(userFilter);

        setChatFlow(chatArray);

        break;
      }
      case "PROPERTY_SIZE_FILTER": {
        chatInfo.MinSize = value;
        setChatInfo(chatInfo);

        // show the answer
        let userFilter = ChatOptions.find((c) => c.type === "FILTER_SELECTION");
        chatArray.push(userFilter);

        setChatFlow(chatArray);

        break;
      }
    }
    setFilterUpdate(true);
  };

  const removeFilter = (filterName) => {
    let tmp = { ...chatInfo };
    switch (filterName) {
      case "PROPERTY_TYPE_FILTER": {
        tmp.PropertyType = "";
        break;
      }
      case "PRICE_FILTER": {
        tmp.MaxPrice = 0;
        break;
      }
      case "DISTANCE_FILTER": {
        tmp.Radius = 0;
        break;
      }
      case "PROPERTY_SIZE_FILTER": {
        tmp.MinSize = 0;
        break;
      }
    }

    setChatInfo(tmp);

    let chatArray = [...chatFlow];
    chatArray = chatArray.filter((item) => item.type !== filterName);
    chatArray = chatArray.filter((item) => item.type !== "SEARCH_RESULT");
    chatArray = chatArray.filter((item) => item.type !== "FILTER_SELECTION");
    chatArray = chatArray.filter(
      (item) => item.type !== "PROPERTY_TYPE_FILTER"
    );
    chatArray = chatArray.filter((item) => item.type !== "PRICE_FILTER");
    chatArray = chatArray.filter((item) => item.type !== "DISTANCE_FILTER");
    chatArray = chatArray.filter(
      (item) => item.type !== "PROPERTY_SIZE_FILTER"
    );

    let userFilter = ChatOptions.find((c) => c.type === "FILTER_SELECTION");
    chatArray.push(userFilter);
    setChatFlow(chatArray);

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

    if (newTopHeight > 100 && newBottomHeight > 100) {
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

  const showPropertyInfo = (advertId) => {
    if (showAdvertInfo.show == false) {
      setShowAdvertInfo({ show: true, advertId: advertId });
    } else {
      setShowAdvertInfo({ show: false, advertId: 0 });
    }
  };

  const shareAdvert = (advertId) => {
    setShareView({ show: true, advertId: advertId });
  };
  const closeShareAdvert = () => {
    setShareView({ show: false, advertId: 0 });
  };
  const showChatWithOwner = (advertId) => {
    showPropertyInfo(advertId);

    setShowChat(!showChat);
  };
  const hideChatWithOwner = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="w-full h-full flex">
      <div
        className="w-full flex flex-col"
        style={{ height: `${viewportHeight}px` }}
      >
        {/* Top Div */}
        <TopBar showAvatar={true} showLogin={true} />

        {/* Middle Div (Flexible) */}
        <div className="w-full flex-1 flex flex-col" ref={containerRef}>
          {/* Top Div */}
          <div className="" style={{ height: heights.top }}>
            <MapView properties={roomList} />
          </div>

          <div
            className="w-full relative flex flex-1 flex-col"
            ref={bottomContainerRef}
          >
            <div
              className="w-full flex items-center justify-center h-5"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              <div className="w-[60%] max-w-[160px] h-[.4rem] rounded-full bg-gray-300" />
            </div>

            <div
              className="w-full flex-1 absolute top-[1.25rem] "
              style={{ height: `${bottomContainerHeight - 16}px` }}
            >
              <Chat
                chat_flow={chatFlow}
                room_list={roomList}
                chat_info={chatInfo}
                removeFilter={removeFilter}
                filterSelection={filterSelection}
                showPropertyInfo={showPropertyInfo}
                shareAdvert={shareAdvert}
              />
            </div>
          </div>
        </div>

        {/* Bottom Div */}
        <ChatFooter pageType={"chat"} />

        {/* show property view */}
        {showAdvertInfo.show && (
          <PropertyDetailPage
            advertId={showAdvertInfo.advertId}
            shareAdvert={shareAdvert}
            showPropertyInfo={showPropertyInfo}
            showChatWithOwner={showChatWithOwner}
            showButtons={true}
          />
        )}
        {/* shareView */}
        {shareView.show && (
          <ShareAdvert
            closeShareAdvert={closeShareAdvert}
            advertId={shareView.advertId}
          />
        )}
      </div>

      {/* chat with owner */}
      <ChatWithOwner
        advertId={showAdvertInfo.advertId}
        isVisible={showChat}
        closeChatWithOwner={hideChatWithOwner}
      />
    </div>
  );
};

export default ChatView;
