import { useRef, useState, useEffect, memo, useCallback } from "react";
import { RoomCardMini } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setActiveAdvert, setIsFavorite } from "../../features/chat/chatSlice";

const RoomCardSlider = memo(
  ({ room_list, dot_count, chatItem, showPropertyInfo, shareAdvert }) => {
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const cardRefs = useRef({});
    const [activeDot, setActiveDot] = useState(0);
    const { activeAdvert } = useSelector((store) => store.chat);

    let scrollTimeout = useRef(null);

    const handleScrollEnd = useCallback(() => {
      if (!scrollRef.current) return;

      const scrollContainer = scrollRef.current;
      const containerCenter =
        scrollContainer.scrollLeft + scrollContainer.clientWidth / 2;

      let closestCard = null;
      let closestDistance = Infinity;

      Object.values(cardRefs.current).forEach((card) => {
        if (card) {
          const cardRect = card.getBoundingClientRect();
          const cardCenter =
            cardRect.left + cardRect.width / 2 + scrollContainer.scrollLeft;

          const distance = Math.abs(containerCenter - cardCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
          }
        }
      });

      if (closestCard) {
        const cardId = Object.keys(cardRefs.current).find(
          (id) => cardRefs.current[id] === closestCard
        );
        dispatch(setActiveAdvert(parseInt(cardId)));
      }
    }, []);

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

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(handleScrollEnd, 200);
    };

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = chatItem.scrollPosition;
      }

      if (activeAdvert == 0) {
        setTimeout(handleScrollEnd, 200);
      }
    }, []); // ✅ Runs only once after initial render

    useEffect(() => {
      scrollToCard(activeAdvert);
    }, [activeAdvert]);

    useEffect(() => {
      const scrollElement = scrollRef.current;
      if (scrollElement) {
        scrollElement.addEventListener("scroll", handleScroll);
        return () => scrollElement.removeEventListener("scroll", handleScroll);
      }
    }, [dot_count]); // Add dot_count as a dependency to handle changes

    // Function to scroll to a specific RoomCardMini
    const scrollToCard = (advertId) => {
      if (advertId == -1) return;

      if (cardRefs.current[advertId]) {
        cardRefs.current[advertId].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    };

    return (
      <div className="w-full flex flex-col my-2 mx-2">
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
              <div
                ref={(el) => (cardRefs.current[room.Id] = el)}
                key={room.Id}
                className="flex items-center justify-center"
              >
                <RoomCardMini
                  advertInfo={room}
                  shareAdvert={shareAdvert}
                  showPropertyInfo={showPropertyInfo}
                />
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
  }
);

export default RoomCardSlider;
