import { useEffect, useState } from "react";

const HomeView = () => {
  const [footerBottom, setFooterBottom] = useState("1rem"); // Default bottom spacing

  useEffect(() => {
    // Store the initial viewport height
    const initialViewportHeight = window.innerHeight;

    // Lock the viewport height to prevent resizing on keyboard open
    const lockViewport = () => {
      // Set the body height to 100vh based on initial height, overriding dynamic viewport changes
      document.body.style.height = `${initialViewportHeight}px`;

      // Prevent body scrolling when the keyboard is open
      document.body.style.overflow = "hidden";
    };

    // Reset the body height and allow scrolling when the keyboard is closed
    const unlockViewport = () => {
      document.body.style.height = "";
      document.body.style.overflow = "";
    };

    // Adjust footer position dynamically when keyboard appears
    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardHeight =
          window.innerHeight - window.visualViewport.height;

        if (keyboardHeight > 0) {
          setFooterBottom(`${keyboardHeight + 16}px`); // Move footer above the keyboard
          lockViewport(); // Lock the viewport when keyboard opens
        } else {
          setFooterBottom("1rem"); // Reset footer position when keyboard closes
          unlockViewport(); // Unlock the viewport when keyboard closes
        }
      }
    };

    // Add resize event listener for detecting keyboard visibility
    window.visualViewport?.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-screen bg-white">
      {/* Top bar stays fixed */}
      <div className="topBar fixed top-0 left-0 right-0 h-12 flex items-center justify-center bg-blue-200 z-10">
        <h1 className="text-center text-2xl">Welcome to Roomufy</h1>
      </div>

      {/* Main body */}
      <div className="body flex flex-col justify-between h-full pt-16 pb-16">
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
