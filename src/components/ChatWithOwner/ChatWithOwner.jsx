import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../TopBar/TopBar";
import ChatWithOwnerTopBar from "./ChatWithOwnerTopBar";
import RoomCardMini from "../RoomCard/RoomCardMini";
import { CiSearch } from "react-icons/ci";
import ChatLoader from "../ChatLoader/ChatLoader";
import { isLoadingFn } from "../../features/chat/chatSlice";
import PropertyDetailPageLight from "../PropertyDetailPage/PropertyDetailPageLight";

const ChatWithOwner = ({
  isVisible,
  advertId,
  closeChatWithOwner,
  allowPropertyPage,
}) => {
  const dispatch = useDispatch();
  const topRef = useRef(null);
  const chatRef = useRef(null);
  const bottomRef = useRef(null);
  const [chatHeight, setChatHeight] = useState(0);
  const { roomList, chatHistory, isLoading } = useSelector(
    (store) => store.chat
  );
  const [advertInfo, setAdvertInfo] = useState(null);
  const [showPropertyDetailPage, setShowPropertyDetailPage] = useState(false);

  useEffect(() => {
    if (roomList.length > 0) {
      for (let i = 0; i < roomList.length; i++) {
        if (roomList[i].Id == advertId) {
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

    setTimeout(() => {
      dispatch(isLoadingFn(false));
    }, 2000);
  }, []);

  useEffect(() => {
    if (isVisible) {
      dispatch(isLoadingFn(true));
      // Set loading to false after 2 seconds
      const timer = setTimeout(() => {
        dispatch(isLoadingFn(false));
      }, 2000);
      return () => clearTimeout(timer); // Cleanup timeout if component unmounts early
    }
  }, [isVisible]);

  const shareAdvert = () => {};

  const showPropertyInfo = () => {
    setShowPropertyDetailPage(!showPropertyDetailPage);
  };

  return (
    <div>
      <div
        className={`w-full h-full z-100 fixed top-0 right-0 transition-transform duration-500 flex flex-col ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* place holder */}
        <TopBar leftIcon="burger" />
        <div className="w-full h-full flex flex-col bg-white">
          <div className="w-full h-[54px] bg-blue-300" ref={topRef}>
            <ChatWithOwnerTopBar closeChatWithOwner={closeChatWithOwner} />
          </div>

          <div
            className="flex flex-col gap-1 overflow-y-auto px-4 py-2 "
            style={{ height: `${chatHeight}px` }}
          >
            <div
              className="w-full flex justify-center"
              onClick={allowPropertyPage ? showPropertyInfo : undefined}
            >
              <RoomCardMini advertInfo={advertInfo} shareAdvert={shareAdvert} />
            </div>

            {isLoading ? (
              <ChatLoader />
            ) : (
              chatHistory.map((chatItem) => {
                return (
                  <div
                    key={chatItem.id}
                    className={`w-full flex  ${
                      chatItem.sender == "renter"
                        ? "justify-end"
                        : "justify-start"
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
              })
            )}
          </div>

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

      {/* showPropertyInfo */}
      <PropertyDetailPageLight
        isVisible={showPropertyDetailPage}
        advertId={advertId}
        closePropertyDetailPageLight={showPropertyInfo}
      />
    </div>
  );
};

export default ChatWithOwner;
