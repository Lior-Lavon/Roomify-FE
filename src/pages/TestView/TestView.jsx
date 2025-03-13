import { useEffect, useState } from "react";

const HomeView = () => {
  const [footerBottom, setFooterBottom] = useState("1rem"); // Default bottom spacing

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardHeight =
          window.innerHeight - window.visualViewport.height;

        // When the keyboard opens, move the footer above the keyboard
        if (keyboardHeight > 0) {
          setFooterBottom(`${keyboardHeight + 16}px`); // Add extra space to avoid overlap
          document.body.style.overflow = "hidden"; // Prevent body scroll when keyboard is open
        } else {
          setFooterBottom("1rem"); // Reset footer when keyboard closes
          document.body.style.overflow = ""; // Allow body scrolling when keyboard is closed
        }
      }
    };

    // Add resize event listener
    window.visualViewport?.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
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
        {/* Content (this could be more complex as needed) */}
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
