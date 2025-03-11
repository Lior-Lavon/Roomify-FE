import React from "react";
import { BsChat } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/landing");
  };
  return (
    <div className="w-full bg-gray-100 px-2 h-12 flex flex-row items-center justify-between text-lg z-50 shadow-[0px_1px_1px_rgba(0,0,0,.2)]">
      <div className="flex items-center gap-0.5">
        <p
          className="sans-bold tracking-wide cursor-pointer"
          onClick={handleClick}
        >
          ROOM<span className="text-orange-600">UFI</span>
        </p>
        <p className="text-[10px]">V1.3</p>
      </div>

      <BsChat className="cursor-pointer" />
    </div>
  );
};

export default TopBar;
