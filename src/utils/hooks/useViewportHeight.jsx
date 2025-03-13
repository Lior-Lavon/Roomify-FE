import { useState, useEffect } from "react";

const useKeyboardStatus = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isDelay, setIsDelay] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  let timeoutId = null;

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.innerHeight - window.visualViewport.height;

        // Ignore small height differences (to prevent false triggers)
        console.log("heightDiff : ", heightDiff);
        console.log("isDelay : ", isDelay);

        if (heightDiff > 100) {
          setIsKeyboardOpen(true);
          setKeyboardHeight(heightDiff);

          setTimeout(() => {
            // det the flag
            setIsDelay(true);

            // create the flag
            setTimeout(() => {
              setIsDelay(false);
            }, 1000);
          }, 1000);
        }
        if (isDelay) {
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
