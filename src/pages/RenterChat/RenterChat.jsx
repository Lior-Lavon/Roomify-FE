import React from "react";
import { useEffect, useState, useRef } from "react";
import { TopBar } from "../../components";
import { CiSearch } from "react-icons/ci";
import RentalChatCards from "./RentalChatCards";
import ChatWithOwner from "../../components/ChatWithOwner/ChatWithOwner";

const ChatHistory = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
];

const RenterChat = () => {
  const [height, setHeight] = useState(0);
  const topRef = useRef(null);
  const [advertId, setAdvertId] = useState({ show: false, chatId: 0 });

  useEffect(() => {
    if (topRef.current) {
      const topBottom = topRef.current.getBoundingClientRect().bottom;
      // const bottomTop = bottomRef.current.getBoundingClientRect().top;
      const bottomTop = window.innerHeight;
      setHeight(bottomTop - topBottom); // Calculate space between them
    }
  }, []);

  const handleChatSelect = (chatId) => {
    setAdvertId({ show: true, chatId: chatId });
  };

  const hideChatWithOwner = () => {
    setAdvertId({ show: false, chatId: 0 });
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-full h-screen flex flex-col">
        <TopBar leftIcon="burger" />

        {/* search */}
        <div className="w-[90%] mx-auto py-2 relative" ref={topRef}>
          <input
            type="text"
            // name="chat"
            placeholder="Search chats"
            className="w-full h-10 bg-white border border-gray-300 rounded-full shadow-sm outline-none pl-10 "
            // onChange={handleChange}
          />
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <CiSearch className="text-2xl text-gray-500" />
          </div>
        </div>

        <div
          className="w-full overflow-y-auto flex flex-col gap-1"
          style={{ height: `${height}px` }} // Set height dynamically
        >
          {ChatHistory.map((item) => {
            return (
              <RentalChatCards
                key={item.id}
                chatId={item.id}
                handleChatSelect={handleChatSelect}
              />
            );
          })}
        </div>
      </div>

      {/* chat with owner */}
      <ChatWithOwner
        advertId={advertId.chatId}
        isVisible={advertId.show}
        closeChatWithOwner={hideChatWithOwner}
      />
    </div>
  );
};

export default RenterChat;
