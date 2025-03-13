import { useEffect, useState } from "react";

const HomeView = () => {
  const [footerBottom, setFooterBottom] = useState("1rem"); // Default bottom spacing

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardHeight =
          window.innerHeight - window.visualViewport.height;
        if (keyboardHeight > 0) {
          setFooterBottom(`${keyboardHeight + 16}px`); // Move footer above keyboard
        } else {
          setFooterBottom("1rem"); // Reset footer position
        }
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="body fixed top-0 left-0 right-0 h-[100vh] bg-white">
      {/* Top bar stays fixed */}
      <div className="topBar fixed top-0 w-full h-12 flex items-center justify-center bg-blue-200 z-10">
        <h1 className="text-center text-2xl">Welcome to Roomufy</h1>
      </div>

      {/* Footer moves above keyboard dynamically */}
      <div
        className="footer fixed left-0 right-0 px-4 transition-all duration-300 z-20"
        style={{ bottom: footerBottom }}
      >
        <input
          type="text"
          placeholder="Enter something..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
        />
      </div>
    </div>
  );
};

export default HomeView;
