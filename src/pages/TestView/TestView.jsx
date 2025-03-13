import { useEffect, useState } from "react";

const HomeView = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const checkForKeyboard = () => {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.clientHeight;
      const keyboardVisible = viewportHeight < documentHeight - 100; // Adjust threshold if needed

      setIsKeyboardOpen(keyboardVisible);

      if (keyboardVisible) {
        document.body.style.overflow = "hidden"; // Prevent scrolling
      } else {
        document.body.style.overflow = ""; // Restore scrolling
      }
    };

    window.addEventListener("resize", checkForKeyboard);
    return () => window.removeEventListener("resize", checkForKeyboard);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-full bg-white overflow-hidden">
      {/* This ensures the content stays in place */}
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-center text-2xl">Welcome to Roomufy</h1>
      </div>

      {/* Input stays fixed at the bottom */}
      <div className="fixed bottom-4 left-0 right-0 px-4">
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
