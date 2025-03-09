import ChatLoader from "../ChatLoader/ChatLoader";
import RoomCardSlider from "../RoomCardSlider/RoomCardSlider";

import ChatMessage from "../ChatMessage/ChatMessage";
import FilterView from "../FilterView/FilterView";
import { useEffect, useRef } from "react";

const Chat = ({
  chat_flow,
  room_list,
  filterSelection,
  showPropertyInfo,
  height,
}) => {
  const divRef = useRef();

  const randId = () => {
    // Generate a random number between 0 and 100 (inclusive)
    return Math.floor(Math.random() * 10000);
  };

  const scrollToBottom = () => {
    console.log("scrollToBottom");

    if (divRef.current) {
      // divRef.current.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        divRef.current.scrollTo({
          top: divRef.current.scrollHeight,
          behavior: "smooth", // Smooth scroll behavior
        });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat_flow]);

  return (
    <div
      className="w-full overflow-y-auto overflow-x-hidden"
      style={{ height: `${height}px` }}
      ref={divRef}
    >
      {chat_flow.map((chatItem) => {
        if (chatItem.type == "LOADNING") {
          return <ChatLoader key={chatItem.id} />;
        } else if (chatItem.type == "PROMPT") {
          return <ChatMessage key={chatItem.id} chatItem={chatItem} />;
        } else if (chatItem.type == "SEARCH_RESULT") {
          return (
            <RoomCardSlider
              key={randId()}
              room_list={room_list}
              dot_count={4}
              showPropertyInfo={showPropertyInfo}
            />
          );
        } else if (
          chatItem.type == "DISTANCE_FILTER" ||
          chatItem.type == "PROPERTY_SIZE_FILTER" ||
          chatItem.type == "PROPERTY_TYPE_FILTER"
        ) {
          return (
            <FilterView
              key={chatItem.id}
              info={chatItem}
              userSelection={filterSelection}
            />
          );
        }
      })}
    </div>
  );
};

export default Chat;
