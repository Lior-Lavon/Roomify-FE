import React, { useEffect, useState } from "react";
import RoomCardMini from "../RoomCard/RoomCardMini";
import { useSelector } from "react-redux";
import { ShareAdvertCard } from "..";
import { IoMdClose } from "react-icons/io";

const ShareAdvert = ({ advertId, closeShareAdvert }) => {
  const { roomList } = useSelector((store) => store.chat);
  const [advertInfo, setAdvertInfo] = useState(null);

  useEffect(() => {
    for (let i = 0; i < roomList.length; i++) {
      if (roomList[i].Id == advertId) {
        setAdvertInfo(roomList[1]);
        break;
      }
    }
  }, [roomList]);

  return (
    <div className="w-full h-screen fixed top-0 z-100 flex justify-center items-center sans-regular bg-[rgba(0,0,0,0.05)]">
      <div className="w-[80%] max-w-[350px] bg-white border-[.06rem] rounded-2xl shadow-md p-2">
        <div className="w-full flex items-center justify-between">
          <p>Share with friends :</p>
          <div
            className="w-8 h-8 flex items-center justify-center text-xl"
            onClick={closeShareAdvert}
          >
            <IoMdClose />
          </div>
        </div>
        <div className="mt-1">
          <ShareAdvertCard room_info={advertInfo} />
        </div>
      </div>
    </div>
  );
};

export default ShareAdvert;
