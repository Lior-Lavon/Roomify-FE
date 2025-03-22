import React, { useEffect, useRef, useState } from "react";
import { PropertyDetailPage, RoomCardMini, TopBar } from "../../components";
import { useSelector } from "react-redux";

const ProfileView = () => {
  const myProfileRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (myProfileRef.current) {
      const topBottom = myProfileRef.current.getBoundingClientRect().bottom;
      // const bottomTop = bottomRef.current.getBoundingClientRect().top;
      const bottomTop = window.innerHeight;
      setHeight(bottomTop - topBottom); // Calculate space between them
    }
  }, []);

  return (
    <div className="w-full h-full">
      <TopBar leftIcon="burger" />

      <p
        ref={myProfileRef}
        className="pl-4 mt-2 mb-1 text-lg sans-bold text-orange-600"
      >
        My Profile
      </p>

      {/* body */}
      <div
        className="w-full py-2 overflow-y-auto flex flex-col gap-2 items-center"
        style={{ height: `${height}px` }}
      ></div>
    </div>
  );
};

export default ProfileView;
