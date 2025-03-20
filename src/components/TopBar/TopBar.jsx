import React, { useState } from "react";
import { BsChat } from "react-icons/bs";
import { IoChatbubbleOutline, IoCloseOutline } from "react-icons/io5";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MenuItems = [
  {
    id: 1,
    name: "Aaaaa",
    link: "/#",
  },
  {
    id: 2,
    name: "Bbbbb",
    link: "/#",
  },
  {
    id: 3,
    name: "Ccccc",
    link: "/#",
  },
  {
    id: 4,
    name: "Ddddd",
    link: "/#",
  },
  {
    id: 5,
    name: "Effff",
    link: "/#",
  },
];

const TopBar = (props) => {
  const { profile } = useSelector((store) => store.user);
  const { leftIcon, rightIcon } = props;
  const [isMenu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/landing");
  };

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleChatView = () => {
    navigate("/chats");
  };

  return (
    <div className="w-full bg-white px-2 h-14 flex flex-row items-center justify-between text-lg z-50 border-b-[1px] border-gray-300 sans-regular">
      <div className="text-3xl w-[20%]">
        {leftIcon == "burger" && (
          <div className="group relative cursor-pointer">
            {!isMenu ? (
              !profile ? (
                <RxHamburgerMenu onClick={handleMenu} />
              ) : (
                <RxAvatar onClick={handleMenu} />
              )
            ) : (
              <IoCloseOutline onClick={handleMenu} />
            )}
            <div
              className={`absolute z-[9999] ${
                !isMenu ? "hidden" : "inline-block"
              } w-[300px] rounded-md bg-white p-2 text-black text-base shadow-md`}
            >
              <ul>
                {MenuItems.map((data) => {
                  return (
                    <li key={data.id} className="cursor-pointer">
                      <a
                        href={data.link}
                        className="inline-block w-full rounded-md p-2"
                      >
                        {data.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-0.5 text-[1rem]">
        <p
          className="sans-bold tracking-wide cursor-pointer"
          onClick={handleClick}
        >
          ROOM<span className="text-orange-600">UFI</span>
        </p>
      </div>

      <div className="w-[20%] max-w-[80px]">
        {rightIcon != undefined ? (
          !profile ? (
            <div
              className="bg-orange-600 text-white rounded-xl px-2 py-1 text-sm text-center"
              onClick={handleSignIn}
            >
              Log In
            </div>
          ) : (
            <div
              className="flex items-center justify-end"
              onClick={handleChatView}
            >
              <IoChatbubbleOutline className="text-2xl" />
            </div>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
