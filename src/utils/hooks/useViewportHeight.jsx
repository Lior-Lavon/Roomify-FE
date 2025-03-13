import { useState, useEffect } from "react";

const useKeyboardStatus = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      console.log("handleResize is called");

      if (window.visualViewport) {
        console.log("window.visualViewport");

        const heightDiff = window.innerHeight - window.visualViewport.height;
        if (heightDiff > 100) {
          console.log("heightDiff > 100");
          // Keyboard is open (adjust threshold if needed)
          setIsKeyboardOpen(true);
          setKeyboardHeight(heightDiff);
        } else {
          console.log("heightDiff < 100");
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
    };
  }, []);

  return { isKeyboardOpen, keyboardHeight };
};

export default useKeyboardStatus;
