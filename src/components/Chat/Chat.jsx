import ChatLoader from "../ChatLoader/ChatLoader";
import RoomCardSlider from "../RoomCardSlider/RoomCardSlider";

import ChatMessage from "../ChatMessage/ChatMessage";
import FilterView from "../FilterView/FilterView";

const Chat = ({ chat_data, room_list, height }) => {
  const filterSelection = (filterName, value) => {
    console.log(filterName, value);
  };

  return (
    <div
      className="w-full overflow-y-auto overflow-x-hidden"
      style={{ height: `${height}px` }}
    >
      {chat_data.map((chatItem) => {
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
// {chat_data.map((chatItem) => {
//   if (chatItem.type == "LOADNING") {
//     return <ChatLoader key={chatItem.id} />;
//   } else if (chatItem.type == "PROMPT") {
//     return <ChatMessage kay={chatItem.id} chatItem={chatItem} />;
//   } else return <div key={chatItem.id}></div>;
// })}

// else if (chatItem.type == "PROMPT") {
//   return <ChatMessage kay={index} chatItem={chatItem} />;
// }

// {chat_data.map((chatItem, index) => {
//   console.log("chatItem : ", chatItem);

// if (chatItem.type == "LOADNING") {
//   return <ChatLoader kay={index} />;
// }
// return <div key={index}></div>;
// })}

{
  /* {chat_data.map((chatItem, index) => {
        console.log("index : ", index);

        if (chatItem.type == "LOADNING") {
          return <ChatLoader kay={index} />;
        } else {
          return <div kay={index}></div>;
        }
      })} */
}
{
  /* <RoomCardSlider room_list={room_list} dot_count={4} /> */
}
