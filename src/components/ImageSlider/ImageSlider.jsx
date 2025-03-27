import { useRef, useState, useEffect } from "react";

const ImageSlider = ({ imageList, dot_count }) => {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const section = scrollWidth / dot_count; // Dynamically set sections based on dot_count
      const index = Math.min(dot_count - 1, Math.floor(scrollLeft / section)); // Max index based on dot_count
      setActiveDot(index);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, [dot_count]); // Add dot_count as a dependency to handle changes

  return (
    <div className="w-full flex flex-col ">
      {/* TopDiv with horizontal scrollable cards */}
      <div
        className="w-full overflow-x-auto whitespace-nowrap flex items-center pb-1"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // for Firefox
          msOverflowStyle: "none", // for IE
        }}
        ref={scrollRef}
      >
        {imageList?.map((image, index) => {
          return (
            <div
              key={index}
              className="min-w-full w-full flex items-center justify-center bg-red-400"
            >
              <img
                src={image}
                className="w-full h-[12rem] object-cover rounded-lg"
              />
            </div>
          );
        })}
      </div>

      {/* BottomDiv with dynamic dots */}
      <div className="w-full mt-1 flex items-center justify-center gap-2">
        {[...Array(dot_count)].map(
          (
            _,
            index // Use dot_count for number of dots
          ) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full ${
                activeDot === index ? "bg-orange-600" : "bg-gray-200"
              }`}
            ></div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
