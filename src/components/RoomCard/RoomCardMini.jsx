import React, { useEffect, useRef } from "react";
import roomImg1 from "../../assets/room1.jpeg";

const RoomCardMini = ({ room_info, onVisible }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisible(room_info.Id); // Call the callback when fully visible
          }
        });
      },
      { threshold: 1.0 } // Fully visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [room_info.Id, onVisible]);

  return (
    <div
      ref={cardRef}
      className="min-w-[280px] w-[280px] border border-orange-200 rounded-xl p-1 px-2 flex flex-row gap-2 items-center justify-between shadow-[10px_2px_12px_rgba(0,0,0,.1)] "
    >
      <div className="flex flex-col items-center justify-between w-full  text-left ">
        <div className="w-full flex flex-col gap-[.05rem]">
          <p className="font-bold">Room Name</p>
          <p className="text-[10px]">Full address ...</p>
        </div>
        <p className="text-[10px] w-full mt-1">
          <span className="text-orange-600 text-[16px] sans-bold">$2,000</span>{" "}
          / month
        </p>
      </div>
      <img
        src={roomImg1}
        className="w-[5.2rem] h-[4rem] object-cover rounded-lg"
      />
    </div>
  );
};

export default RoomCardMini;
