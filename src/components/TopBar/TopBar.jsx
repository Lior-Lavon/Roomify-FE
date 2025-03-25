import React, { useState } from "react";
import { BsChat } from "react-icons/bs";
import { IoChatbubbleOutline, IoCloseOutline } from "react-icons/io5";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import FemaleImage from "../../assets/female.jpg";
import { setUserLogout } from "../../features/user/userSlice";
import { IoMdClose } from "react-icons/io";

const LoginMenuItems = [
  {
    id: 1,
    name: "My Profile",
    link: "/profile",
  },
  {
    id: 2,
    name: "My Favorite",
    link: "/favorites",
  },
  {
    id: 3,
    name: "My Properties",
    link: "",
  },
  {
    id: 4,
    name: "Section Name",
    link: "",
  },
  // {
  //   id: 5,
  //   name: "Effff",
  //   link: "/#",
  // },
];
const MenuItems = [
  {
    id: 1,
    name: "Section name",
    link: "",
  },
  {
    id: 2,
    name: "Section name",
    link: "",
  },
  {
    id: 3,
    name: "Section name",
    link: "",
  },
  {
    id: 4,
    name: "Section name",
    link: "",
  },
  {
    id: 5,
    name: "Section name",
    link: "",
  },
  {
    id: 6,
    name: "Section name",
    link: "",
  },
];

const TopBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector((store) => store.user);
  const { leftIcon, rightIcon, closeSignIn } = props;
  const [isMenu, setIsMenu] = useState(false);

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

  const logout = () => {
    dispatch(setUserLogout(null));
    navigate("/landing");
    setTimeout(() => {
      setIsMenu(false);
    }, 100);
  };

  return (
    <div className="w-full bg-white px-2 h-14 flex flex-row items-center justify-between text-lg z-50 border-b-[1px] border-gray-300 sans-regular">
      <div className="text-3xl w-[20%]">
        {leftIcon == "burger" ? (
          <div className="group relative cursor-pointer">
            {!isMenu ? (
              !profile ? (
                <RxHamburgerMenu onClick={handleMenu} />
              ) : (
                // <RxAvatar onClick={handleMenu} />
                <img
                  src={FemaleImage}
                  className="w-10 h-10 object-contain rounded-full"
                  alt=""
                  onClick={handleMenu}
                />
              )
            ) : (
              <IoCloseOutline onClick={handleMenu} />
            )}
            <div
              className={`absolute z-[9999] ${
                !isMenu ? "hidden" : "inline-block"
              } w-screen -ml-2 min-h-[calc(100vh-2.7rem)] rounded-md bg-white text-black text-base shadow-md`}
            >
              {profile ? (
                <div className="w-full h-full ml-6">
                  <div className="w-full flex flex-col items-center justify-center gap-2 mt-10">
                    <img
                      src={FemaleImage}
                      className="w-20 h-20 rounded-full border-[1px] border-gray-200"
                    />
                    <p className="sans-bold">User Name</p>
                  </div>

                  <ul className="">
                    {LoginMenuItems.map((data) => {
                      return (
                        <li
                          key={data.id}
                          className="cursor-pointer border-l-2 border-orange-500 my-6"
                        >
                          <NavLink
                            to={data.link}
                            onClick={handleMenu}
                            className="inline-block w-full rounded-md pl-2"
                          >
                            {data.name}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>

                  <p className="fixed bottom-0 mb-6" onClick={logout}>
                    Log out
                  </p>
                </div>
              ) : (
                <div className="w-full h-full ml-6">
                  <ul className="mt-10">
                    {MenuItems.map((data) => {
                      return (
                        <li
                          key={data.id}
                          className="cursor-pointer border-l-2 border-orange-500 my-6"
                        >
                          <NavLink
                            to={data.link}
                            className="inline-block w-full rounded-md pl-2"
                          >
                            {data.name}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="" onClick={closeSignIn}>
            {closeSignIn != undefined && <IoMdClose />}
          </div>
        )}
      </div>

      <div className="flex items-center gap-0.5 text-[1rem]">
        <p
          className="sans-bold tracking-wide cursor-pointer"
          onClick={handleClick}
        >
          ROOM<span className="text-orange-600">IFY</span>
        </p>
      </div>

      <div className="w-[20%] max-w-[80px]">
        {rightIcon != undefined &&
          (!profile ? (
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
          ))}
      </div>
    </div>
  );
};

export default TopBar;
