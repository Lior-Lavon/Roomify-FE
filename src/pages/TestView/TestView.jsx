import { useEffect, useState } from "react";

const HomeView = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardVisible =
          window.visualViewport.height < window.innerHeight;
        setIsKeyboardOpen(keyboardVisible);

        if (keyboardVisible) {
          document.body.style.overflow = "hidden"; // Prevents scrolling
        } else {
          document.body.style.overflow = "";
        }
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="body fixed top-0 left-0 right-0 h-full bg-white overflow-hidden">
      {/* This ensures the content stays in place */}
      <div className="topBar fixed top-0 w-full h-12 flex items-center justify-center bg-blue-200">
        <h1 className="text-center text-2xl">Welcome to Roomufy</h1>
      </div>

      {/* Input stays fixed at the bottom and moves above keyboard when opened */}
      <div
        className={`footer fixed left-0 right-0 px-4 transition-transform duration-300 ${
          isKeyboardOpen ? "bottom-[calc(100vh-100%)]" : "bottom-4"
        }`}
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
