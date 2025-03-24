import { useEffect } from "react";

const usePreventPullToRefresh = () => {
  useEffect(() => {
    let lastY = 0;

    const handleTouchStart = (event) => {
      lastY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      const currentY = event.touches[0].clientY;
      const yDiff = currentY - lastY;

      const scrollingElement =
        document.scrollingElement || document.documentElement;

      // Only prevent if we're at the top and user is pulling down
      if (scrollingElement.scrollTop === 0 && yDiff > 0) {
        event.preventDefault();
      }
    };

    // Use passive: false ONLY for touchmove
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
};

export default usePreventPullToRefresh;
