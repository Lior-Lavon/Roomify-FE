import React, { useRef, useState } from "react";
import { Chat, MapView, TopBar } from "../../components";

const ChatView = () => {
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

  return <div className="w-full h-[100vh] flex flex-col bg-red-500">lior</div>;
};

export default ChatView;
