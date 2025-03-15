import React, { useEffect, useState } from "react";
import ChatWithOwnerTopBar from "./ChatWithOwnerTopBar";
import ShareAdvertCard from "../RoomCard/ShareAdvertCard";
import { useSelector } from "react-redux";
import RoomCardMini from "../RoomCard/RoomCardMini";
import TopBar from "../TopBar/TopBar";

const ChatWithOwner = ({ advertId, isVisible, closeChatWithOwner }) => {
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

  const setFavorite = () => {};
  const shareAdvert = () => {};

  return (
    <div
      className={`w-full h-full z-100 fixed top-0 right-0  transition-transform duration-500 flex flex-col ${
        isVisible ? "translate-x-0" : "translate-x-full left-0"
      }`}
    >
      {/* place holder */}
      <TopBar showAvatar={true} showLogin={false} />
      {/* back-btn and owner */}
      <div className="w-full h-full flex flex-col bg-white">
        {/* top bar */}
        <div className="w-full h-[54px] bg-blue-300 ml-10">
          <ChatWithOwnerTopBar closeChatWithOwner={closeChatWithOwner} />
        </div>

        <div className="w-full flex-1 bg-red-400"></div>

        {/* <div className="w-full flex-1 flex flex-col gap-2 px-4 overflow-y-auto overflow-x-hidden bg-red-400"> */}
        {/* <div className="w-full flex justify-center mt-4">
            <RoomCardMini
              advertInfo={advertInfo}
              setFavorite={setFavorite}
              shareAdvert={shareAdvert}
            />
          </div> */}

        {/* {chatHistory.map((chatItem) => {
            return (
              <div
                key={chatItem.id}
                className={`w-full flex  ${
                  chatItem.sender == "renter" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`w-[50%] flex items-center leading-[1.1rem] text-sm sans-regular p-2 rounded-2xl ${
                    chatItem.sender == "renter"
                      ? "rounded-br-xs bg-[#ff5733]"
                      : "rounded-bl-xs bg-[#d9d9d9]"
                  }`}
                >
                  <p>{chatItem.text}</p>
                </div>
              </div>
            );
          })} */}
        {/* </div> */}

        {/* footer */}
        <div className="w-full h-12 fixed bottom-0 flex items-center justify-center bg-blue-300  ml-10">
          {/* <input
            type="text"
            name="chat"
            placeholder="Type your message here "
            className="w-full h-10 bg-white border border-gray-300 rounded-full shadow-sm focus:ring-2 outline-none mx-4 pl-2"
            // onChange={handleChange}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatWithOwner;
