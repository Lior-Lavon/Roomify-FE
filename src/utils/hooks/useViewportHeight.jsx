import { useState, useEffect } from "react";

const useKeyboardStatus = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  let timeoutId = null;

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.innerHeight - window.visualViewport.height;

        // If heightDiff > threshold, keyboard is open
        console.log("heightDiff : ", heightDiff);
        if (heightDiff > 100) {
          console.log("heightDiff > 100");

          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setIsKeyboardOpen(true);
            setKeyboardHeight(heightDiff);
          }, 200); // Small delay to stabilize the event
        } else {
          console.log("heightDiff <=0");
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setIsKeyboardOpen(false);
            setKeyboardHeight(0);
          }, 200); // Delay to prevent flickering
        }
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      if (window.visualViewport) {
        console.log("removeEventListener called");

        window.visualViewport.removeEventListener("resize", handleResize);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  return { isKeyboardOpen, keyboardHeight };
};

export default useKeyboardStatus;
