import { useEffect, useState } from "react";

const HomeView = () => {
  const [footerBottom, setFooterBottom] = useState("1rem"); // Default bottom spacing
  const [topBarTop, setTopBarTop] = useState("0px"); // Default position for topBar

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardHeight =
          window.innerHeight - window.visualViewport.height;

        if (keyboardHeight > 0) {
          // When keyboard appears, adjust the `topBar`'s position
          setTopBarTop(`${keyboardHeight}px`); // Push `topBar` down by keyboard height

          // Move footer above the keyboard
          setFooterBottom(`${keyboardHeight + 16}px`); // Add some extra padding to the footer
          document.body.style.overflow = "hidden"; // Prevent body scrolling
        } else {
          // Reset the `topBar` and footer when the keyboard is hidden
          setTopBarTop("0px");
          setFooterBottom("1rem");
          document.body.style.overflow = ""; // Allow scrolling when keyboard is hidden
        }
      }
    };

    // Listen for changes in visualViewport size (keyboard show/hide)
    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen bg-white">
      {/* Top bar adjusts its position based on keyboard visibility */}
      <div
        className="topBar fixed left-0 right-0 h-12 flex items-center justify-center bg-blue-200 z-10"
        style={{ top: topBarTop }}
      >
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
