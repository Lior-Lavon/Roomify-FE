import React, { memo, useEffect, useRef } from "react";
import roomImg1 from "../../assets/room1.jpeg";

const RoomCardMini = memo(({ room_info, onVisible }) => {
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
          <p className="font-bold">{room_info.Title}</p>
          <p className="text-[10px]">{room_info.Address}</p>
        </div>
        <p className="text-[10px] w-full mt-1">
          <span className="text-orange-600 text-[16px] sans-bold">
            ${room_info.Price}
          </span>{" "}
          / month
        </p>
      </div>
      {room_info.Images.length >= 1 && (
        <img
          src={room_info.Images[0]}
          className="w-[6.2rem] h-[5rem] object-cover rounded-lg"
        />
      )}
    </div>
  );
});

export default RoomCardMini;
