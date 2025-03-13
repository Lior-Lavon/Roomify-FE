import { useEffect, useState } from "react";

const TestView = () => {
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
    <div
      className={`w-full h-[100dvh] bg-white overflow-hidden ${
        isKeyboardOpen ? "fixed" : ""
      }`}
    >
      <h1 className="text-center text-2xl">Welcome to Roomufy</h1>

      {/* Input Field */}
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

export default TestView;
