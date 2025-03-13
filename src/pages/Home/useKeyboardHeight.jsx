import { useState, useEffect } from "react";

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const initialHeight = window.innerHeight;

  useEffect(() => {
    const handleResize = () => {
      const heightDiff = initialHeight - window.innerHeight;
      if (heightDiff > 100) {
        // Keyboard is likely open
        setKeyboardHeight(heightDiff);
        setIsKeyboardVisible(true);
      } else {
        setKeyboardHeight(0);
        setIsKeyboardVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialHeight]);

  return { keyboardHeight, isKeyboardVisible };
};

export default useKeyboardHeight;
