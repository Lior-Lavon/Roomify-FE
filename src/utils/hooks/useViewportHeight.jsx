import { useState, useEffect } from "react";

const useKeyboardStatus = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  let timeoutId = null;

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.innerHeight - window.visualViewport.height;

        // Ignore small height differences (to prevent false triggers)
        if (heightDiff > 100) {
          clearTimeout(timeoutId);
          setIsKeyboardOpen(true);
          setKeyboardHeight(heightDiff);
        } else if (isKeyboardOpen) {
          // If keyboard was previously open, wait before resetting (ignoring quick events)
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setIsKeyboardOpen(false);
            setKeyboardHeight(0);
          }, 500); // Delay to prevent false resets
        }
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
      clearTimeout(timeoutId);
    };
  }, [isKeyboardOpen]); // Depend on isKeyboardOpen to prevent unnecessary resets

  return { isKeyboardOpen, keyboardHeight };
};

export default useKeyboardStatus;
