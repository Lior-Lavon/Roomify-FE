import { useEffect, useRef, useState } from "react";
import { PromptFooter, RoomCard, TopBar } from "../../components";
import useKeyboardStatus from "../../utils/hooks/useViewportHeight";

// fixed top-[17rem]
const HomeView = () => {
  const { isKeyboardOpen, keyboardHeight } = useKeyboardStatus();

  useEffect(() => {
    console.log(`top-[${keyboardHeight}px]`);

    console.log("isKeyboardOpen !: ", isKeyboardOpen);
    console.log("keyboardHeight !: ", Math.floor(keyboardHeight));
  }, [isKeyboardOpen, keyboardHeight]);

  return (
    <div
      className={`base:hidden sm:block md:hidden w-full h-[100dvh] text-3xl sans-regular bg-white fixed   transition-all duration-250 ${
        !isKeyboardOpen ? "top-0" : "top-[0px]"
      }`}
    >
      <TopBar showAvatar={true} showLogin={true} />

      <div className="mt-15 inline-block w-full text-center ">
        <h1 className="text-transparent bg-gradient-to-r from-[#261a18] to-[#ff5733] bg-clip-text font-bold text-2lg">
          Welcome to Roomify
        </h1>
        <p className="text-[#7b7b7b] text-[15px] mt-2">
          Find your perfect rental.
        </p>
        {/* <p className="text-black text-sm">rooms for rent today</p> */}
      </div>

      <PromptFooter pageType={"home"} />

      <p className="text-center mt-2 text-[12px] text-sm text-gray-400">
        Available rooms to rent near you
      </p>

      <div className="mt-10">
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

      {/* <div className="text-sm">
        <p>Keyboard Open: {isKeyboardOpen ? "Yes" : "No"}</p>
        <p>Keyboard Height: {keyboardHeight}px</p>
      </div>
 */}
    </div>
  );
};

export default HomeView;
