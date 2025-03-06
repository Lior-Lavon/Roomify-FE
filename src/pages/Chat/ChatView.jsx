import { useState, useRef, useEffect } from "react";
import { MapView, TopBar } from "../../components";

const ChatView = () => {
  // const [topHeight, setTopHeight] = useState("50%");
  const bottomContainer = useRef(null);
  const [bottomHeight, setBottomHeight] = useState("50%");
  const [isResizing, setIsResizing] = useState(false);

  const [initPos, setInitPos] = useState(0);

  useEffect(() => {
    console.log("initPos updated : ", initPos);
  }, [initPos]);

  const handleMouseDown = (event) => {
    setInitPos(event.clientY);

    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // get the frame of the rectangle
    // if (bottomContainer.current) {
    //   const rect = bottomContainer.current.getBoundingClientRect();
    //   console.log("rect-top :", rect.top);

    // setBottomHeight(`${rect.height - 10}px`);
    // }
  };

  const handleMouseMove = (event) => {
    // console.log("handleMouse - Move");

    // if (!isResizing) return;
    console.log(initPos, event.clientY);
    // console.log("offsetTop : ", event.target.parentElement.offsetTop);

    // setBottomHeight(`${event.target.parentElement.offsetTop}px`);

    // setBottomHeight(`${}`)

    // const parentHeight = 500; // Fixed height of the parent div
    // const newBottomHeight =
    //   event.clientY - event.target.parentElement.offsetTop;
    // const newBottomHeight = parentHeight - newTopHeight - 8; // Subtract resizer height (8px)
    // if (newTopHeight > 50 && newBottomHeight > 50) {
    //   setTopHeight(`${newTopHeight}px`);
    //   setBottomHeight(`${newBottomHeight}px`);
    // }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <TopBar />

      <div className="flex-1 flex flex-col">
        <div className="w-full flex-1 relative z-0">
          <MapView />
        </div>

        <div
          ref={bottomContainer}
          className="w-full rounded-tl-2xl rounded-tr-2xl bg-red-200 "
          style={{ height: bottomHeight }}
        >
          <div
            className="w-full h-4 flex items-center justify-center cursor-pointer"
            onMouseDown={handleMouseDown}
          >
            <div className="flex flex-col justify-center">
              <div className="w-[10rem] h-[.1rem] bg-black" />
              <div className="w-[7rem] h-[.1rem] bg-black mt-[.15rem] mx-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-12 bg-gray-100">
        <p className="text-gray-400 h-full text-sm flex items-center pl-4 ">
          Type your search
        </p>
      </div>
    </div>
  );
};

export default ChatView;

{
  /* <div className="p-2 flex flex-row gap-2 overflow-auto">
  <RoomCardMini />
  <RoomCardMini />
  <RoomCardMini />
  <RoomCardMini />
  <RoomCardMini />
</div>; */
}
