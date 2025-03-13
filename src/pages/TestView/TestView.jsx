import { useEffect, useState } from "react";

const HomeView = () => {
  const [footerBottom, setFooterBottom] = useState("1rem"); // Default bottom spacing
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Lock the viewport height to the initial size
    const handleResize = () => {
      // Set a fixed height for body to prevent resizing due to keyboard
      setViewportHeight(window.innerHeight);
      // Reset the overflow style to allow scrolling again when keyboard is hidden
      document.body.style.overflow = "hidden";
    };

    // Update the height when the visual viewport changes (keyboard opens/closes)
    const handleVisualResize = () => {
      const keyboardHeight = window.innerHeight - window.visualViewport.height;

      if (keyboardHeight > 0) {
        // The keyboard is open, so we calculate its height and move the footer above it
        setFooterBottom(`${keyboardHeight + 16}px`);
        document.body.style.overflow = "hidden"; // Prevent scrolling during keyboard visibility
      } else {
        // Reset footer position and allow scrolling again when keyboard is hidden
        setFooterBottom("1rem");
        document.body.style.overflow = ""; // Allow scrolling after keyboard is hidden
      }
    };

    // Attach event listeners to handle resizing and keyboard visibility
    window.addEventListener("resize", handleResize); // For when window size changes
    window.visualViewport?.addEventListener("resize", handleVisualResize); // For when visualViewport changes due to keyboard

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleVisualResize);
    };
  }, []);

  // Lock the body height to the viewport height to avoid layout shifts
  useEffect(() => {
    document.body.style.height = `${viewportHeight}px`;
  }, [viewportHeight]);

  return (
    <div className="relative h-full bg-white">
      {/* Top bar stays fixed */}
      <div className="topBar fixed top-0 left-0 right-0 h-12 flex items-center justify-center bg-blue-200 z-10">
        <h1 className="text-center text-2xl">Welcome to Roomufy</h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col justify-between h-full pt-16 pb-16">
        {/* Content */}
        <div className="content flex-grow flex justify-center items-center">
          <p>Content goes here</p>
        </div>

        {/* Footer moves above the keyboard */}
        <div
          className="footer fixed left-0 right-0 px-4 transition-all duration-300 z-20"
          style={{ bottom: footerBottom }}
        >
          <input
            type="text"
            placeholder="Enter something..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
