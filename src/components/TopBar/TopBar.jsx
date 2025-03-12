import React from "react";
import { BsChat } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const TopBar = (props) => {
  const { showAvatar, showLogin } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/landing");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="w-full bg-gray-100 px-2 h-12 flex flex-row items-center justify-between text-lg z-50 shadow-[0px_1px_1px_rgba(0,0,0,.2)] sans-regular">
      <div className="text-3xl w-[20%]">{showAvatar && <RxAvatar />}</div>

      <div className="flex items-center gap-0.5 text-[1rem]">
        <p
          className="sans-bold tracking-wide cursor-pointer"
          onClick={handleClick}
        >
          ROOM<span className="text-orange-600">UFI</span>
        </p>
      </div>

      <div className="w-[20%] max-w-[80px]">
        {showLogin && (
          <div
            className="bg-orange-600 text-white rounded-xl px-2 py-1 text-sm text-center"
            onClick={handleSignIn}
          >
            Log In
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
