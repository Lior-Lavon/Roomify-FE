import React, { useState } from "react";
import { BsChat } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
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
  const { showAvatar, showLogin } = props;
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

  return (
    <div className="w-full bg-gray-100 px-2 h-12 flex flex-row items-center justify-between text-lg z-50 shadow-[0px_1px_1px_rgba(0,0,0,.2)] sans-regular">
      <div className="text-3xl w-[20%]">
        {showAvatar && (
          <div className="group relative cursor-pointer">
            <RxAvatar onClick={handleMenu} />
            <div
              className={`absolute z-[9999] ${
                !isMenu ? "hidden" : "inline-block"
              } w-[200px] rounded-md bg-white p-2 text-black text-base shadow-md`}
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
