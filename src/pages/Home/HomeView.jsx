import { useEffect, useState } from "react";
import { PromptFooter, RoomCard, TopBar } from "../../components";
import useKeyboardStatus from "../../utils/hooks/useViewportHeight";

// fixed top-[17rem]
const HomeView = () => {
  const { isKeyboardOpen, keyboardHeight } = useKeyboardStatus();

  useEffect(() => {
    console.log("isKeyboardOpen !: ", isKeyboardOpen);
    console.log("keyboardHeight !: ", keyboardHeight);
  }, [isKeyboardOpen, keyboardHeight]);

  return (
    <div
      className={`base:hidden sm:block md:hidden w-full h-[100dvh] text-3xl sans-regular bg-white fixed top-[${
        isKeyboardOpen ? keyboardHeight + "px" : "0px"
      }]`}
    >
      <TopBar showAvatar={true} showLogin={true} />

      <div className="mt-4 inline-block w-full text-center">
        <h1 className="text-black sans-bold">Welcome to</h1>
        <h1 className="text-orange-600 sans-bold">Roomufy</h1>
        <p className="text-black text-sm mt-2">
          The <span className="text-orange-600 ">new way to search</span> for
        </p>
        <p className="text-black text-sm">rooms for rent today</p>
      </div>

      <div className="mt-2">
        <div className="p-2 flex flex-row gap-2 overflow-auto">
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </div>
      </div>

      <div className="text-sm">
        <p>Keyboard Open: {isKeyboardOpen ? "Yes" : "No"}</p>
        <p>Keyboard Height: {keyboardHeight}px</p>
      </div>

      <p className="text-center mt-2 text-[12px] text-sm text-gray-400">
        Available rooms to rent near you
      </p>
      <PromptFooter pageType={"home"} />
    </div>
  );
};

export default HomeView;
