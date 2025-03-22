import React, { memo, useEffect, useRef, useState } from "react";

import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const ShareAdvertCard = memo(({ advertInfo }) => {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className={`w-full flex flex-row gap-4 items-center justify-between`}
    >
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex">
          <div className="w-full h-[6rem] flex flex-col  pl-2 py-1">
            <p className="font-bold">{advertInfo?.Title}</p>
            <p className="text-[10px]">
              <span className="text-orange-600 text-[16px] sans-bold">
                ${advertInfo?.Price}
              </span>
              / month
            </p>
          </div>
          {advertInfo?.Images.length >= 1 && (
            <img
              src={advertInfo?.Images[0]}
              className="w-[6.2rem] h-[5rem] object-cover rounded-lg"
            />
          )}
        </div>

        <div className="flex h-8 items-center justify-evenly rounded-lg">
          <a href={"/#"} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-6 h-6 text-blue-600 hover:opacity-75" />
          </a>
          <a href={"/#"} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-6 h-6 text-blue-400 hover:opacity-75" />
          </a>
          <a href={"/#"} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 text-blue-700 hover:opacity-75" />
          </a>
          <a href={"/#"} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="w-6 h-6 text-green-600 hover:opacity-75" />
          </a>
          <a href={"/#"}>
            <FaEnvelope className="w-6 h-6 text-gray-600 hover:opacity-75" />
          </a>
        </div>
      </div>
    </div>
  );
});

export default ShareAdvertCard;
