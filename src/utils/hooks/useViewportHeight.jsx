import { useState, useEffect, useRef } from "react";

const useKeyboardStatus = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const isDelayRef = useRef(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  let timeoutId = null;

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.innerHeight - window.visualViewport.height;

        // Ignore small height differences (to prevent false triggers)
        if (heightDiff > 100) {
          document.body.style.overflow = "hidden"; // Prevent scrolling

          isDelayRef.current = true;
          setIsKeyboardOpen(true);
          setKeyboardHeight(heightDiff);

          setTimeout(() => {
            isDelayRef.current = false;
          }, 700);
        } else if (!isDelayRef.current) {
          // If keyboard was previously open, wait before resetting (ignoring quick events)

          document.body.style.overflow = ""; // Restore scrolling

          setIsKeyboardOpen(false);
          setKeyboardHeight(0);
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
