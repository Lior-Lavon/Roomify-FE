import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import PropertyImg from "../../assets/room1.jpeg";

const PropertyDetailPageTopBar = ({ title, closePropertyDetailPage }) => {
  // console.log("title : ", title);

  return (
    <div className="w-full h-12 bg-white flex items-center">
      <div
        className="w-12 h-12 flex items-center justify-center"
        onClick={closePropertyDetailPage}
      >
        <RiArrowLeftSLine className="text-[40px]" />
      </div>
      <div className="flex gap-1 items-center">
        <img
          src={PropertyImg}
          alt=""
          className="w-9 h-9 flex items-center justify-center object-cover rounded-full"
        />
        <p className="sans-regular text-[1rem] bg-amber-300">{title}</p>
      </div>
    </div>
  );
};

export default PropertyDetailPageTopBar;
