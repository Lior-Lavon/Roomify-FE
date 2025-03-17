import { useEffect } from "react";

const usePreventPullToRefresh = () => {
  useEffect(() => {
    let lastY = 0;

    const handleTouchStart = (event) => {
      lastY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      let yDiff = event.touches[0].clientY - lastY;
      if (window.scrollY === 0 && yDiff > 0) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
};

export default usePreventPullToRefresh;
