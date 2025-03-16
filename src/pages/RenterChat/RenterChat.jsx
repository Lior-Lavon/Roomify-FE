import React from "react";
import { TopBar } from "../../components";
import { CiSearch } from "react-icons/ci";
import RentalChatCards from "./RentalChatCards";

const RenterChat = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <TopBar showAvatar={true} showLogin={false} />

      {/* search */}
      <div className="w-[90%] mx-auto py-2 relative">
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

      <div className="w-full flex-1 bg-white">
        <div className="flex flex-col gap-1">
          <RentalChatCards />
          <RentalChatCards />
          <RentalChatCards />
          <RentalChatCards />
        </div>
      </div>
    </div>
  );
};

export default RenterChat;
