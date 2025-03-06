import React from "react";
import { BsChat } from "react-icons/bs";

const TopBar = () => {
  return (
    <div className="w-full bg-gray-100 px-2 h-12 flex flex-row items-center justify-between text-lg z-50 shadow-[0px_1px_1px_rgba(0,0,0,.2)]">
      <p className="sans-bold tracking-wide cursor-pointer">
        ROOM<span className="text-orange-600">UFI</span>
      </p>
      <BsChat className="cursor-pointer" />
    </div>
  );
};

export default TopBar;
