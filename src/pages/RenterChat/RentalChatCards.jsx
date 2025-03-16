import React from "react";
import Image1 from "../../assets/room1.jpeg";

const RentalChatCards = ({ chatId, handleChatSelect }) => {
  const handleChatSelectMe = () => {
    handleChatSelect(chatId);
  };

  return (
    <div
      className="w-full bg-white border-b-[.001rem] border-gray-200"
      onClick={handleChatSelectMe}
    >
      <div className="w-full h-full px-4 py-1 flex flex-row items-center gap-4 justify-between">
        {/* property image */}
        <img
          src={Image1}
          alt=""
          className=" w-[4rem] h-[4rem] rounded-2xl sm:w-[5rem] sm:h-[5rem] object-contain"
        />
        {/* Property Info */}
        <div className="flex-2 flex flex-col text-[.7rem] text-gray-500">
          <p className="text-sm">Room name</p>
          <p className="">Address ...</p>
          <p className="">Landlord name</p>
        </div>
        {/* Last message */}
        <div className="w-[20%] flex flex-col gap-2 justify-end text-sm text-gray-500">
          <div className="flex justify-end">
            <p>Yesterday</p>
          </div>
          <div className="flex justify-end">
            <div className="w-2 h-2 rounded-full bg-orange-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalChatCards;
