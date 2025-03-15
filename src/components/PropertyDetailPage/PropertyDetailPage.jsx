import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import ImageSlider from "../ImageSlider/ImageSlider";
import { PiDivide } from "react-icons/pi";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { GoShareAndroid } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { FiMapPin } from "react-icons/fi";
import { setIsFavorite } from "../../features/chat/chatSlice";
import PropertyOnMap from "./PropertyOnMap";

const PropertyDetailPage = ({ advertId, shareAdvert, showPropertyInfo }) => {
  const dispatch = useDispatch();
  const { roomList } = useSelector((store) => store.chat);

  const [advertInfo, setAdvertInfo] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (roomList.length > 0) {
      for (let i = 0; i < roomList.length; i++) {
        if (roomList[i].Id === advertId) {
          setAdvertInfo(roomList[i]);
          break;
        }
      }
    }
  }, [advertId, roomList]);

  // const shareAdvertMe = () => {
  //   shareAdvert();
  // };

  const setFavorite = () => {
    dispatch(setIsFavorite(advertInfo.Id));
  };
  const showMapOverlay = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="w-full h-screen fixed top-0 z-100 flex justify-center items-center sans-regular bg-[rgba(0,0,0,0.1)]">
      <div className="max-w-[600px] w-[90%] bg-white rounded-xl border-[.02rem] border-black shadow-[10px_2px_12px_rgba(0,0,0,.3)] relative">
        <div className="m-4 flex flex-col gap-1">
          <div className="w-full flex flex-row justify-between items-center">
            <div className=" text-base sans-bold">{advertInfo?.Title}</div>
            <IoMdClose
              className="text-2xl text-gray-500 cursor-pointer"
              onClick={showPropertyInfo}
            />
          </div>
          <p className="text-[12px]">Address...</p>
          <p className="text-[11px] ">
            Cozy room for rent in the heart of the city, offering a quiet,
            peaceful setting. Fully furnished with a comfortable bed, desk,
            wardrobe, and more, perfect for work or relaxation.
          </p>
          <div className="w-full flex items-center justify-between ">
            <p className="text-[10px] w-full">
              <span className="text-orange-600 text-[20px] sans-bold">
                ${advertInfo?.Price}
              </span>
              /month
            </p>
            <div className="w-full h-8 flex items-center justify-end gap-2 text-orange-600 ">
              <div onClick={setFavorite}>
                {advertInfo?.IsFavorite ? (
                  <MdFavorite className="w-6 h-6" />
                ) : (
                  <MdFavoriteBorder className="w-6 h-6" />
                )}
              </div>
              <div onClick={showMapOverlay}>
                <FiMapPin className="w-6 h-6 " />
              </div>
              <div onClick={shareAdvert}>
                <GoShareAndroid className="w-6 h-6 " />
              </div>
            </div>
          </div>

          {/* image slider */}
          <div className="mt-1">
            <ImageSlider imageList={advertInfo?.Images} dot_count={4} />
          </div>
          <div className="w-full text-[12px] flex flex-col gap-[.15rem]">
            <div className="flex">
              <p className="w-[50%]">Shower</p>
              <p className="w-[50%]">Stove</p>
            </div>
            <div className="flex">
              <p className="w-[50%]">Bathtub</p>
              <p className="w-[50%]">Induction Cooking</p>
            </div>
            <div className="flex">
              <p className="w-[50%]">Balcony</p>
              <p className="w-[50%]">TV</p>
            </div>
            <div className="flex">
              <p className="w-[50%]">Cabinet</p>
              <p className="w-[50%]">Sofa</p>
            </div>
            <div className="flex">
              <p className="w-[50%]">Bed</p>
              <p className="w-[50%]">Internet</p>
            </div>
          </div>

          {/* buttons */}
          <div className="w-full flex flex-col gap-[.4rem] mt-4 text-sm">
            <div>
              <button className="w-full bg-orange-600 text-black rounded-full py-2 cursor-pointer">
                Contact the landlord
              </button>
            </div>
          </div>
        </div>

        {/*  show map */}
        {showMap && (
          <PropertyOnMap poi={advertInfo} closeMapOverlay={showMapOverlay} />
        )}
      </div>
    </div>
  );
};

export default PropertyDetailPage;
