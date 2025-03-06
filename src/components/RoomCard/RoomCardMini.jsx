import React from "react";
import roomImg1 from "../../assets/room-1.jpeg";

const RoomCardMini = () => {
  return (
    <div className="min-w-[280px] w-[280px] border border-orange-200 rounded-xl p-2 flex flex-row gap-2 items-center justify-between shadow-[10px_2px_12px_rgba(0,0,0,.1)] ">
      <div className="flex flex-col items-center justify-between w-full h-[6rem] text-left ">
        <div className="w-full flex flex-col gap-2">
          <p className="font-bold">Room Name</p>
          <p className="text-[10px]">Full address ...</p>
        </div>
        <p className="text-[10px] w-full">
          <span className="text-orange-600 text-[16px] sans-bold">$2,000</span>{" "}
          / month
        </p>
      </div>
      <img
        src={roomImg1}
        className="w-[7.2rem] h-[6rem] object-cover rounded-lg"
      />
    </div>
  );
};

export default RoomCardMini;
