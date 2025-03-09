import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Chat, MapView, PropertyDetailPage, TopBar } from "../../components";

import { RoomList } from "../../MockData/RoomList";
import { ChatOptions } from "../../MockData/ChatOptions";

const ChatView = () => {
  const ChatInfo = {
    Prompt: "I am searching for a room in Amsterdam",
    Address: "Amsterdam",
    PropertyType: "",
    Radius: 0,
    MinPrice: 0,
    minSize: 0,
  };
  const [chatFlow, setChatFlow] = useState([]);
  const bottomContainerRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [showPropertyInfoView, setShowPropertyInfoView] = useState(false);

  const containerRef = useRef(null);
  const isResizingRef = useRef(false);
  const [heights, setHeights] = useState({ top: "40%", bottom: "60%" });

  const [bottomContainerHeight, setBottomContainerHeight] = useState(0);

  const [touchStatus, setTouchStatus] = useState("touchUP");

  const ProcessNextChat = () => {};

  useEffect(() => {
    // get the chat object
    const promptChat = ChatOptions.find((c) => c.type === "PROMPT");
    promptChat.text = ChatInfo.Prompt;
    chatFlow.push(promptChat);
    setChatFlow(chatFlow);

    const loadingChatItem = ChatOptions.find((c) => c.type === "LOADNING");
    chatFlow.push(loadingChatItem);
    setChatFlow(chatFlow);

    setTimeout(() => {
      let updatedChat = chatFlow.slice();
      // remove loading
      updatedChat = updatedChat.filter((item) => item.type !== "LOADNING");
      console.log(updatedChat);

      // add propertySearch
      const searchResult = ChatOptions.find((c) => c.type === "SEARCH_RESULT");
      updatedChat.push(searchResult);
      setChatFlow(updatedChat);
    }, 2000);

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

  const handleMouseDown = (event) => {
    // Optionally prevent body scroll on mobile devices
    document.body.style.overflow = "hidden";

    event.preventDefault();

    setTouchStatus("touchDown");
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove, { passive: false });

    document.addEventListener("mouseup", handleMouseUp, { once: true });
    document.addEventListener("touchend", handleMouseUp, { once: true });
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    setTouchStatus("touchUP");

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("touchmove", handleMouseMove);

    // Reset body overflow back to normal after dragging ends
    document.body.style.overflow = "auto";
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    setTouchStatus("touchMove");
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

  return (
    <div
      className="w-full flex flex-col "
      style={{ height: `${viewportHeight}px` }}
    >
      {/* Top Div */}
      <TopBar />

      {/* Middle Div (Flexible) */}
      <div ref={containerRef} className="w-full flex-1 flex flex-col">
        {/* Top Div */}
        <div className="bg-blue-500" style={{ height: heights.top }}>
          <MapView />
        </div>

        {/* Bottom Div */}
        <div
          className="w-full relative flex flex-1 flex-col"
          ref={bottomContainerRef}
        >
          {/* Resizer Slider */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full cursor-row-resize h-5 "
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="w-[2rem] h-[.12rem] bg-gray-400 mx-auto mt-2" />
            <div className="w-[1.5rem] h-[.12rem] bg-gray-400 mt-[.1rem] mx-auto" />
          </div>

          {/* White Space Div Below Slider */}
          <div className="m-1 rounded-xl ">
            <Chat
              chat_flow={chatFlow}
              room_list={RoomList}
              processNextChat={ProcessNextChat}
              height={bottomContainerHeight}
            />
          </div>
        </div>
      </div>
      {/* Bottom Div */}
      <div className="w-full h-12 bg-gray-100">
        <p className="text-gray-400 h-full text-sm flex items-center pl-4 ">
          Type your search
        </p>
      </div>

      {/* show property view */}
      {showPropertyInfoView && (
        <PropertyDetailPage property_info={RoomList[0]} />
      )}
    </div>
  );
};

export default ChatView;
