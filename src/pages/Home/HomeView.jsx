import { useEffect, useRef, useState } from "react";
import { Prompt, RoomCard, TopBar } from "../../components";
import useKeyboardStatus from "../../utils/hooks/useViewportHeight";

// fixed top-[17rem]
const HomeView = () => {
  const { isKeyboardOpen, keyboardHeight } = useKeyboardStatus();
  const topBarRef = useRef(null);
  const [height, setHeight] = useState(0);

  // useEffect(() => {
  //   console.log("isKeyboardOpen : ", isKeyboardOpen);
  //   console.log("keyboardHeight : ", keyboardHeight);
  // }, [isKeyboardOpen, keyboardHeight]);

  useEffect(() => {
    console.log("111");

    if (topBarRef.current) {
      console.log("22");
      const topBottom = topBarRef.current.getBoundingClientRect().bottom;
      // const bottomTop = bottomRef.current.getBoundingClientRect().top;
      const bottomTop = window.innerHeight;
      setHeight(bottomTop - topBottom); // Calculate space between them
    }
  }, []);

  return (
    <div
      className={`base:hidden sm:block md:hidden w-full h-full relative text-3xl sans-regular `}
    >
      <div ref={topBarRef} className="w-full">
        <TopBar showAvatar={true} showLogin={true} />
      </div>

      {/* body */}
      <div
        className="w-full h-full overflow-y-auto "
        style={{ height: `${height}px` }}
      >
        <div className="pt-22 w-full inline-block text-center">
          <h1 className="text-transparent bg-gradient-to-r from-[#261a18] to-[#ff5733] bg-clip-text font-bold text-2lg ">
            Welcome to Roomify
          </h1>
          <p className="text-[#7b7b7b] text-[15px] mt-2">
            Find your perfect rental.
          </p>
        </div>

        <div className={`w-full mt-16`}>
          <Prompt />

          <div className="mt-10">
            <p className="text-center px-2 text-lg text-black">
              Recent listings
            </p>

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

// ${
//           keyboardHeight > 0 ? `top-[${getKeyboardHeight()}px]` : ""
//         }
