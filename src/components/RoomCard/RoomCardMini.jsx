import React, { memo, useEffect, useRef, useState } from "react";
import { GoShareAndroid } from "react-icons/go";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setIsFavorite } from "../../features/chat/chatSlice";

const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const RoomCardMini = memo(
  ({ advertInfo, shareAdvert, showPropertyInfo, showShare }) => {
    const cardRef = useRef(null);
    const screenWidth = useScreenWidth() * 0.9;

    const dispatch = useDispatch();

    const setMeFavorite = (e) => {
      e.stopPropagation();
      dispatch(setIsFavorite(advertInfo.Id));
    };

    const shareMeAdvert = (e) => {
      e.stopPropagation();
      shareAdvert(advertInfo.Id);
    };

    const onAdvertClick = () => {
      if (showPropertyInfo != undefined) {
        showPropertyInfo(advertInfo.Id);
      }
    };

    return (
      <div
        ref={cardRef}
        className={`h-[100px] border border-orange-200 rounded-xl flex flex-row gap-2 items-center justify-between shadow-[10px_2px_12px_rgba(0,0,0,.1)] `}
        style={{
          width: screenWidth,
        }}
        onClick={onAdvertClick}
      >
        <div className="w-full h-full flex flex-col justify-between gap-1 pl-2">
          <div className="w-full max-w-[350px] whitespace-normal break-words flex flex-col  pt-[2px]">
            <p className="text-[13px] font-bold">{advertInfo?.Title}</p>
            <p className="text-[11px]">{advertInfo?.Address}</p>
          </div>

          <div className="w-full flex items-center justify-between pb-1">
            <p className="text-[10px]">
              <span className="text-orange-600 text-sm sans-bold">
                ${advertInfo?.Price + " "}
              </span>
              / month
            </p>

            <div className="flex gap-3 ">
              <div onClick={setMeFavorite}>
                {advertInfo?.IsFavorite ? (
                  <MdFavorite className="w-[1.15rem] h-[1.15rem]" />
                ) : (
                  <MdFavoriteBorder className="w-[1.15rem] h-[1.15rem]" />
                )}
              </div>
              {showShare != undefined && showShare == true && (
                <div onClick={shareMeAdvert}>
                  <GoShareAndroid className="w-[1.15rem] h-[1.15rem] " />
                </div>
              )}
            </div>
          </div>
        </div>
        {advertInfo?.Images.length >= 1 && (
          <img
            src={advertInfo?.Images[0]}
            className="w-[7.2rem] h-[100px] object-cover rounded-tr-lg rounded-br-lg"
          />
        )}
      </div>
    );
  }
);

export default RoomCardMini;
