import React, { useState, useEffect } from "react";

const TestView = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Handle the start of the drag when touch starts
  const handleTouchStart = (event) => {
    // Prevent default to avoid unwanted scrolling
    event.preventDefault();

    setIsDragging(true);

    // Add event listeners for touchmove and touchend
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  // Handle the dragging when touch moves
  const handleTouchMove = (event) => {
    if (!isDragging) return;

    // Get the touch position from the first touch point
    const touch = event.touches[0];
    setPosition({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  // Handle the end of the drag when touch ends
  const handleTouchEnd = () => {
    setIsDragging(false);

    // Remove event listeners for touchmove and touchend
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <div>
      <div
        onTouchStart={handleTouchStart} // For mobile touch start
        style={{
          position: "absolute",
          top: position.y - 50, // Offset to center the div on touch
          left: position.x - 50, // Offset to center the div on touch
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

export default TestView;
