import { RoomCardSlider } from "..";
import ChatLoader from "../ChatLoader/ChatLoader";

import ChatMessage from "../ChatMessage/ChatMessage";
import FilterView from "../FilterView/FilterView";
import { useEffect, useRef, useState } from "react";

const Chat = ({
  chat_flow,
  room_list,
  chat_info,
  filterSelection,
  showPropertyInfo,
  onCardVisible,
  setActiveSlider,
  height,
}) => {
  const divRef = useRef();

  const randId = () => {
    // Generate a random number between 0 and 100 (inclusive)
    return Math.floor(Math.random() * 10000);
  };

  const scrollToBottom = () => {
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
          chatItem.id = randId();
          return (
            <RoomCardSlider
              key={chatItem.id}
              room_list={room_list}
              dot_count={4}
              chatItem={chatItem}
              onCardVisible={onCardVisible}
              showPropertyInfo={showPropertyInfo}
              setActiveSlider={setActiveSlider}
            />
          );
        } else if (
          chatItem.type == "DISTANCE_FILTER" ||
          chatItem.type == "PRICE_FILTER" ||
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
        } else if (chatItem.type == "FILTER_SELECTION") {
          //  show only the user selection
          return (
            <div className="w-full flex gap-1 mb-4" key={randId()}>
              <p className="inline-block bg-black text-white py-1 px-4 rounded-full">
                {chatItem.text.charAt(0).toUpperCase() + chatItem.text.slice(1)}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Chat;
