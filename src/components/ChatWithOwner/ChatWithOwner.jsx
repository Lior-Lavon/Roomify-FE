import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TopBar from "../TopBar/TopBar";
import ChatWithOwnerTopBar from "./ChatWithOwnerTopBar";
import RoomCardMini from "../RoomCard/RoomCardMini";
import { CiSearch } from "react-icons/ci";

const ChatWithOwner = ({ advertId, isVisible, closeChatWithOwner }) => {
  const topRef = useRef(null);
  const chatRef = useRef(null);
  const bottomRef = useRef(null);
  const [chatHeight, setChatHeight] = useState(0);
  const { roomList, chatHistory } = useSelector((store) => store.chat);
  const [advertInfo, setAdvertInfo] = useState(null);

  useEffect(() => {
    if (roomList.length > 0) {
      for (let i = 0; i < roomList.length; i++) {
        if (roomList[i].Id === advertId) {
          setAdvertInfo(roomList[i]);
          break;
        }
      }
    }
  }, [advertId, roomList]);

  useEffect(() => {
    if (topRef.current && bottomRef.current) {
      const topBottom = topRef.current.getBoundingClientRect().bottom;
      const bottomTop = bottomRef.current.getBoundingClientRect().top;
      setChatHeight(bottomTop - topBottom); // Calculate space between them
    }
  }, []);

  const setFavorite = () => {};
  const shareAdvert = () => {};

  return (
    <div
      className={`w-full h-full z-100 fixed top-0 right-0 transition-transform duration-500 flex flex-col ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* place holder */}
      <TopBar showAvatar={true} showLogin={true} />
      <div className="w-full h-full flex flex-col bg-white">
        {/* TopBar */}
        <div className="w-full h-[54px] bg-blue-300" ref={topRef}>
          <ChatWithOwnerTopBar closeChatWithOwner={closeChatWithOwner} />
        </div>

        {/* Body (Takes up remaining space) */}
        <div
          className="flex flex-col gap-1 overflow-y-auto px-4 py-2 "
          style={{ height: `${chatHeight}px` }} // Set height dynamically
        >
          <div className="w-full flex justify-center">
            <RoomCardMini
              advertInfo={advertInfo}
              setFavorite={setFavorite}
              shareAdvert={shareAdvert}
            />
          </div>

          {chatHistory.map((chatItem) => {
            return (
              <div
                key={chatItem.id}
                className={`w-full flex  ${
                  chatItem.sender == "renter" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`w-[60%] flex items-center leading-[1.1rem] text-sm sans-regular p-2 rounded-2xl ${
                    chatItem.sender == "renter"
                      ? "rounded-br-xs bg-[#ff5733]"
                      : "rounded-bl-xs bg-[#d9d9d9]"
                  }`}
                >
                  <p>{chatItem.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="w-full h-14 fixed bottom-0 flex items-center justify-center"
          ref={bottomRef}
        >
          <div className="w-full h-full relative mx-4 flex items-center">
            <textarea
              type="text"
              name="chat"
              placeholder="Type your message here "
              className="w-full h-11 bg-white resize-none align-middle border border-gray-300 rounded-full shadow-sm outline-none pl-2 pt-2 focus:border-gray-400"
              // onChange={handleChange}
            />
            <div className="absolute right-2 top-1/4">
              <CiSearch className="text-2xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithOwner;
