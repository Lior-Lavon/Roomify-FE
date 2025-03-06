import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import RoomCardMini from "../RoomCard/RoomCardMini";

const Chat = ({ height }) => {
  const containerRef = useRef(null);
  //   const [height, setHeight] = useState(0);

  return (
    <div
      className="w-full  overflow-y-auto overflow-x-hidden"
      //   style={{ height: height ? `${height}px` : "auto" }}
      style={{ height: `${height}px` }}
      ref={containerRef}
    >
      <div className="p-2 mt-4 flex flex-row gap-2 overflow-x-auto">
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
      </div>
      <div className="p-2 mt-4 flex flex-row gap-2 overflow-x-auto">
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
      </div>
      <div className="p-2 mt-4 flex flex-row gap-2 overflow-x-auto">
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
      </div>
      <div className="p-2 mt-4 flex flex-row gap-2 overflow-x-auto">
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
      </div>
      <div className="p-2 mt-4 flex flex-row gap-2 overflow-x-auto">
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
      </div>
      <div className="p-2 mt-4 flex flex-row gap-2 overflow-x-auto">
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
        <RoomCardMini />
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
