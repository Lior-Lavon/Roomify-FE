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
        console.log("heightDiff : ", heightDiff);
        console.log("isDelayRef : ", isDelayRef.current);

        if (heightDiff > 100) {
          console.log("opening");
          isDelayRef.current = true;
          setIsKeyboardOpen(true);
          setKeyboardHeight(heightDiff);

          setTimeout(() => {
            isDelayRef.current = false;
          }, 1000);
        } else if (!isDelayRef.current) {
          console.log("closing");

          // If keyboard was previously open, wait before resetting (ignoring quick events)
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
