import React, { useEffect, useRef, useState } from "react";
import { Chat, MapView, TopBar } from "../../components";

const ChatView = () => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      console.log("resizing");

      setViewportHeight(window.innerHeight);
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerRef = useRef(null);
  const isResizingRef = useRef(false);
  const [heights, setHeights] = useState({ top: "40%", bottom: "60%" });

  const handleMouseDown = () => {
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener(
      "mouseup",
      () => (isResizingRef.current = false),
      { once: true }
    );
  };

  const handleMouseMove = (event) => {
    if (!isResizingRef.current) return;
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let newTopHeight = event.clientY - containerRect.top;
    let newBottomHeight = containerRect.height - newTopHeight - 8;

    if (newTopHeight > 100 && newBottomHeight > 100) {
      setHeights({
        top: `${newTopHeight}px`,
        bottom: `${newBottomHeight}px`,
      });
    }
  };

  return (
    <div
      className="w-full flex flex-col bg-red-500"
      style={{ height: `${viewportHeight}px` }}
    >
      <p className="text-base">{import.meta.env.VITE_GOOGLE_API}</p>
      {/* Top Div */}
      {/* <div className="bg-red-500" style={{ height: "3rem" }}></div> */}
      <TopBar />

      {/* Middle Div (Flexible) */}
      <div ref={containerRef} className="w-full flex-1 flex flex-col">
        {/* Top Div */}
        <div className="bg-blue-500" style={{ height: heights.top }}>
          <MapView />
        </div>

        {/* Bottom Div */}
        <div className="relative flex flex-1 flex-col">
          {/* Resizer Slider */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full cursor-row-resize "
            onMouseDown={handleMouseDown}
          >
            <div className="w-[7rem] h-[.15rem] bg-black mx-auto mt-1" />
            <div className="w-[5rem] h-[.15rem] bg-black mt-[.1rem] mx-auto" />
          </div>

          {/* White Space Div Below Slider */}
          <div className="m-1 flex-1 rounded-xl ">
            <Chat />
          </div>
        </div>
      </div>
      {/* Bottom Div */}
      <div className="w-full h-12 bg-gray-100">
        <p className="text-gray-400 h-full text-sm flex items-center pl-4 ">
          Type your search
        </p>
      </div>
    </div>
  );
};

export default ChatView;
