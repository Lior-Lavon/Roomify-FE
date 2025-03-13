import { useEffect, useState } from "react";

const HomeView = () => {
  const [footerBottom, setFooterBottom] = useState("1rem"); // Default bottom spacing

  useEffect(() => {
    const handleResize = () => {
      // Check if the visualViewport API is available (works on modern browsers)
      if (window.visualViewport) {
        // Calculate keyboard height by comparing the window inner height and visual viewport height
        const keyboardHeight =
          window.innerHeight - window.visualViewport.height;

        // If the keyboard is open, adjust the footer's bottom position
        if (keyboardHeight > 0) {
          setFooterBottom(`${keyboardHeight + 16}px`); // Add a small gap for styling
          document.body.style.overflow = "hidden"; // Prevent body scroll while the keyboard is open
        } else {
          setFooterBottom("1rem"); // Reset footer position when the keyboard is closed
          document.body.style.overflow = ""; // Restore scroll behavior
        }
      }
    };

    // Attach the resize event listener to detect when the keyboard is opened or closed
    window.visualViewport?.addEventListener("resize", handleResize);

    // Cleanup event listener when the component is unmounted
    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="body fixed top-0 left-0 right-0 h-[100vh] bg-white">
      {/* Top bar stays fixed */}
      <div className="topBar fixed top-0 left-0 right-0 h-12 flex items-center justify-center bg-blue-200 z-10">
        <h1 className="text-center text-2xl">Welcome to Roomufy</h1>
      </div>

      {/* Footer moves above keyboard dynamically */}
      <div
        className="footer fixed left-0 right-0 px-4 transition-all duration-300 z-20"
        style={{ bottom: footerBottom }} // Dynamically adjusts the position based on keyboard height
      >
        <input
          type="text"
          placeholder="Enter something..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
        />
      </div>
    </div>
  );
};

export default HomeView;
