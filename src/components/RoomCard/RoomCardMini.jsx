import React, { memo, useEffect, useRef, useState } from "react";
import roomImg1 from "../../assets/room1.jpeg";
import { GoShareAndroid } from "react-icons/go";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

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
  ({ advertInfo, onVisible, setFavorite, shareAdvert, showPropertyInfo }) => {
    const cardRef = useRef(null);
    const screenWidth = useScreenWidth() * 0.8;

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onVisible(advertInfo.Id); // Call the callback when fully visible
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
    }, [advertInfo.Id, onVisible]);

    const setMeFavorite = (e) => {
      e.stopPropagation();
      setFavorite(advertInfo.Id);
    };

    const shareMeAdvert = (e) => {
      e.stopPropagation();
      shareAdvert(advertInfo.Id);
    };

    const onAdvertClick = () => {
      showPropertyInfo(advertInfo.Id);
    };

    return (
      <div
        ref={cardRef}
        className={` border border-orange-200 rounded-xl flex flex-row gap-4 items-center justify-between shadow-[10px_2px_12px_rgba(0,0,0,.1)]`}
        style={{ minWidth: `${screenWidth}px`, width: `85%` }}
        onClick={onAdvertClick}
      >
        <div className="w-full h-[6rem] flex flex-col justify-between pl-2 py-1">
          <p className="font-bold">{advertInfo?.Title}</p>
          <p className="text-[10px]">
            <span className="text-orange-600 text-[16px] sans-bold">
              ${advertInfo?.Price}
            </span>
            / month
          </p>
          <div className="w-full h-8 flex items-center gap-2 text-orange-600 ">
            <div onClick={setMeFavorite}>
              {advertInfo?.IsFavorite ? (
                <MdFavorite className="w-6 h-6" />
              ) : (
                <MdFavoriteBorder className="w-6 h-6" />
              )}
            </div>
            <div onClick={shareMeAdvert}>
              <GoShareAndroid className="w-6 h-6 " />
            </div>
          </div>
        </div>
        {advertInfo?.Images.length >= 1 && (
          <img
            src={advertInfo?.Images[0]}
            className="w-[7.2rem] h-[6rem] object-cover rounded-lg"
          />
        )}
      </div>
    );
  }
);

export default RoomCardMini;
