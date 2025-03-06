import React, { useRef, useState } from "react";
import RoomCardMini from "../../components/RoomCard/RoomCardMini";

const ChatView = () => {
  return (
    <div className="mt-3">
      <div className="p-2 flex flex-row gap-2 overflow-auto">
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
      </div>
    </div>
  );
};

export default ChatView;
