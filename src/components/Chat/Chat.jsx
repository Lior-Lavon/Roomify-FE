import React from "react";
import RoomCardMini from "../RoomCard/RoomCardMini";

const Chat = () => {
  return (
    <div>
      <div className="p-2 mt-4 flex flex-row gap-2 overflow-auto">
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
      </div>
    </div>
  );
};

export default Chat;
