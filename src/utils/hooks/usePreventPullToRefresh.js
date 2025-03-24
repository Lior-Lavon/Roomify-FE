import { useEffect } from "react";

// Utility to check if an element is scrollable
const isElementScrollable = (el) => {
  if (!el) return false;
  const style = window.getComputedStyle(el);
  const overflowY = style.overflowY;
  const isScrollableY = overflowY === "auto" || overflowY === "scroll";
  return isScrollableY && el.scrollHeight > el.clientHeight;
};

const useGlobalPreventPullToRefresh = () => {
  useEffect(() => {
    let lastY = 0;

    const handleTouchStart = (event) => {
      lastY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      const currentY = event.touches[0].clientY;
      const yDiff = currentY - lastY;

      if (yDiff <= 0) return; // Only care about downward pull

      let el = event.target;

      // Traverse up to find if any parent is scrollable and not at the top
      while (el && el !== document.body) {
        if (isElementScrollable(el)) {
          if (el.scrollTop > 0) {
            return; // Scroll is in progress normally
          } else {
            break; // Scrollable, but at top — prevent pull-to-refresh
          }
        }
        el = el.parentElement;
      }

      // If we reach here, no scrollable parent is handling it — block pull
      event.preventDefault();
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
};

export default useGlobalPreventPullToRefresh;
