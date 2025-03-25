import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

const ChatViewTopBar = ({ closeChatViewPage }) => {
  return (
    <div className="w-full h-12 bg-white flex items-center">
      <div
        className="w-12 h-12 flex items-center justify-center"
        onClick={closeChatViewPage}
      >
        <RiArrowLeftSLine className="text-[40px]" />
      </div>
      <div className="flex gap-2 items-center">
        {/* <img
          src={PropertyImg}
          alt=""
          className="w-9 h-9 flex items-center justify-center object-cover rounded-full"
        /> */}
        <p className="sans-regular text-lg">Chat with AI</p>
      </div>
    </div>
  );
};

export default ChatViewTopBar;
