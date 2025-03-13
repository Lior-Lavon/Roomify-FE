import { useState, useEffect } from "react";

const useKeyboardStatus = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [lastViewportHeight, setLastViewportHeight] = useState(
    window.visualViewport?.height || window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const newViewportHeight = window.visualViewport.height;
        const heightDiff = window.innerHeight - newViewportHeight;

        // If the viewport height decreased significantly, assume the keyboard opened
        if (heightDiff > 100) {
          setIsKeyboardOpen(true);
          setKeyboardHeight(heightDiff);
        }
        // Only reset if the new height is very close to the original full height
        else if (newViewportHeight >= lastViewportHeight - 10) {
          setIsKeyboardOpen(false);
          setKeyboardHeight(0);
        }

        setLastViewportHeight(newViewportHeight);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, [lastViewportHeight]); // Track lastViewportHeight changes to stabilize detection

  return { isKeyboardOpen, keyboardHeight };
};

export default useKeyboardStatus;
