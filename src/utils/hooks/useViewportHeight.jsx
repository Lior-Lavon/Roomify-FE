import { useState, useEffect } from "react";

const useViewportHeight = () => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    console.log("11");

    const handleResize = () => {
      console.log("222");
      setViewportHeight(window.innerHeight);
    };
    console.log("333");
    // Listen to resize event
    window.addEventListener("resize", handleResize);
    console.log("444");
    // Clean up the event listener
    return () => {
      console.log("555");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportHeight;
};

export default useViewportHeight;
