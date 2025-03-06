import React, { useState, useRef } from "react";

const TouchDragComponent = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null); // Reference to the div we want to drag

  // Handle touch start
  const handleTouchStart = (event) => {
    event.preventDefault(); // Prevent scrolling on touch devices
    const touch = event.touches[0]; // Get the first touch point
    setIsDragging(true);
    setPosition({
      x: touch.clientX,
      y: touch.clientY,
    });

    // Add event listeners for touchmove and touchend
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  // Handle touch move
  const handleTouchMove = (event) => {
    if (!isDragging) return;

    event.preventDefault(); // Prevent scrolling while dragging

    const touch = event.touches[0]; // Get the first touch point
    setPosition({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false);

    // Remove event listeners for touchmove and touchend
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <div>
      <div
        ref={dragRef}
        onTouchStart={handleTouchStart} // Trigger touch start
        style={{
          position: "absolute",
          top: position.y - 50, // Subtract half of the div's height to center it under the finger
          left: position.x - 50, // Subtract half of the div's width to center it under the finger
          width: "100px",
          height: "100px",
          backgroundColor: "lightblue",
          cursor: "pointer",
        }}
      >
        Drag me
      </div>
    </div>
  );
};

export default TouchDragComponent;
