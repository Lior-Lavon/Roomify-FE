import React from "react";

const ChatMessage = ({ chatItem }) => {
  const owner = chatItem.owner;
  return (
    <div className="w-full flex justify-end my-4">
      <div className="w-[70%] max-w-[320px] text-sm p-2 mr-4 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl bg-[#ffeeeb] ">
        {chatItem.text}
      </div>
    </div>
  );
};

export default ChatMessage;
