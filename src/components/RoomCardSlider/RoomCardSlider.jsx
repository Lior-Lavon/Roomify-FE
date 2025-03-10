import { useRef, useState, useEffect } from "react";
import { RoomCardMini } from "../../components";

const RoomCardSlider = ({
  room_list,
  dot_count,
  chatItem,
  showPropertyInfo,
  onCardVisible,
}) => {
  const scrollRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      chatItem.scrollPosition = scrollRef.current.scrollLeft;

      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const section = scrollWidth / dot_count; // Dynamically set sections based on dot_count
      const index = Math.min(dot_count - 1, Math.floor(scrollLeft / section)); // Max index based on dot_count
      setActiveDot(index);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = chatItem.scrollPosition;
    }
  }, []); // ✅ Runs only once after initial render

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, [dot_count]); // Add dot_count as a dependency to handle changes

  const handleCardVisible = (id) => {
    onCardVisible(id);
  };

  return (
    <div className="w-full flex flex-col my-4 " onClick={showPropertyInfo}>
      {/* TopDiv with horizontal scrollable cards */}
      <div
        className="w-full overflow-x-auto whitespace-nowrap flex items-center gap-x-2 pb-1"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // for Firefox
          msOverflowStyle: "none", // for IE
        }}
        ref={scrollRef}
      >
        {room_list.map((room) => {
          return (
            <div key={room.Id} className="flex items-center justify-center ">
              <RoomCardMini room_info={room} onVisible={handleCardVisible} />
            </div>
          );
        })}
      </div>

      {/* BottomDiv with dynamic dots */}
      <div className="w-full mt-2 flex items-center justify-center gap-2">
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

export default RoomCardSlider;
