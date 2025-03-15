import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import AvatarImg from "../../assets/female.jpg";

const ChatWithOwnerTopBar = ({ closeChatWithOwner }) => {
  return (
    <div className="w-full h-full bg-white flex items-center">
      <div
        className="w-12 h-12 flex items-center justify-center"
        onClick={closeChatWithOwner}
      >
        <RiArrowLeftSLine className="text-[40px]" />
      </div>
      <div className="flex gap-2 items-center">
        <img
          src={AvatarImg}
          alt=""
          className="w-9 h-9 flex items-center justify-center object-cover rounded-full"
        />
        <p className="sans-regular text-lg">Landlord name</p>
      </div>
    </div>
  );
};

export default ChatWithOwnerTopBar;
