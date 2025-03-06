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
      console.log("clean up");

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
      <div className="w-full h-full bg-orange-600">
        <div className="w-full h-10 fixed top-0 bg-amber-100">Top bar</div>
        <div className="w-full h-10 fixed bottom-0 bg-amber-100">
          Bottom bar
        </div>
      </div>
    </div>
  );
};

export default ChatView;
