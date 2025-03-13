import { useEffect, useState } from "react";

const HomeView = () => {
  const [footerBottom, setFooterBottom] = useState("1rem"); // Default bottom spacing
  const [bodyPaddingTop, setBodyPaddingTop] = useState("0px"); // Default padding for body

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardHeight =
          window.innerHeight - window.visualViewport.height;

        if (keyboardHeight > 0) {
          // When keyboard is visible, adjust the padding of the body
          setBodyPaddingTop(`${keyboardHeight}px`); // Move the body down by the keyboard height

          // Adjust footer to be above the keyboard
          setFooterBottom(`${keyboardHeight + 16}px`); // Add padding to footer to sit above the keyboard

          // Prevent scrolling during keyboard visibility
          document.body.style.overflow = "hidden"; // Disable scroll
        } else {
          // Reset the body padding and footer position when the keyboard is hidden
          setBodyPaddingTop("0px");
          setFooterBottom("1rem");
          document.body.style.overflow = ""; // Allow scrolling again
        }
      }
    };

    // Add event listener for viewport resize (keyboard appears/disappears)
    window.visualViewport?.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen bg-white">
      {/* Top bar stays fixed */}
      <div className="topBar fixed top-0 left-0 right-0 h-12 flex items-center justify-center bg-blue-200 z-10">
        <h1 className="text-center text-2xl">Welcome to Roomufy</h1>
      </div>

      {/* Main content with dynamic padding to avoid layout shifting */}
      <div className="body" style={{ paddingTop: bodyPaddingTop }}>
        {/* Content goes here */}
        <div className="content flex-grow flex justify-center items-center pt-16 pb-16">
          <p>Content goes here</p>
        </div>
      </div>

      {/* Footer moves above the keyboard */}
      <div
        className="footer fixed left-0 right-0 bottom-0 px-4 transition-all duration-300 z-20"
        style={{ bottom: footerBottom }}
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
