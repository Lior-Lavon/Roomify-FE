import ChatLoader from "../ChatLoader/ChatLoader";
import RoomCardSlider from "../RoomCardSlider/RoomCardSlider";

import ChatMessage from "../ChatMessage/ChatMessage";
import FilterView from "../FilterView/FilterView";
import { useEffect } from "react";

const Chat = ({ chat_flow, room_list, filterSelection, height }) => {
  return (
    <div
      className="w-full overflow-y-auto overflow-x-hidden"
      style={{ height: `${height}px` }}
    >
      {chat_flow.map((chatItem) => {
        if (chatItem.type == "LOADNING") {
          return <ChatLoader key={chatItem.id} />;
        } else if (chatItem.type == "PROMPT") {
          return <ChatMessage key={chatItem.id} chatItem={chatItem} />;
        } else if (chatItem.type == "SEARCH_RESULT") {
          return (
            <RoomCardSlider
              key={chatItem.id}
              room_list={room_list}
              dot_count={4}
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
