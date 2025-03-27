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
import PropertyImageGallery from "./PropertyImageGallery";
import { useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import PropertyDetailPageTopBar from "./PropertyDetailPageTopBar";
import ShareAdvert from "../ShareAdvert/ShareAdvert";
import ChatWithOwner from "../ChatWithOwner/ChatWithOwner";
import SignIn from "../../pages/SignIn/SignIn";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapView from "../MapView/MapView";

const PropertyDetailPage = ({
  isVisible,
  advertId,
  closePropertyDetailPage,
  showPropertyInfo,
  showButtons,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roomList } = useSelector((store) => store.chat);
  const [shareView, setShareView] = useState(false);
  const [showChatWithOwner, setShowChatWithOwner] = useState(false);
  const [showSignIn, setSignIn] = useState(false);

  const [advertInfo, setAdvertInfo] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [imageGallery, setImageGallery] = useState(false);

  const { profile } = useSelector((store) => store.user);

  useEffect(() => {
    if (roomList.length > 0) {
      for (let i = 0; i < roomList.length; i++) {
        if (roomList[i].Id == advertId) {
          setAdvertInfo(roomList[i]);
          break;
        }
      }
    }
  }, [advertId, roomList]);

  useEffect(() => {
    // console.log("useEffect profile : ", profile);
  }, [profile]);

  const shareAdvertMe = () => {
    setShareView(!shareView);
  };

  const setFavorite = () => {
    dispatch(setIsFavorite(advertInfo.Id));
  };
  const showMapOverlay = () => {
    setShowMap(!showMap);
  };

  const showChatWithOwnerMe = () => {
    // check if user is logged in
    if (profile != null) {
      setShowChatWithOwner(!showChatWithOwner);
    } else {
      // show SignIn view
      setSignIn(true);
    }
  };

  // close signin
  // if user signed -> show chatWithOwner
  const closeSignIn = (isSuccess) => {
    if (isSuccess) {
      setShowChatWithOwner(true);
    }
    setTimeout(() => {
      setSignIn(false);
    }, 300);
  };

  const showImageGallery = () => {
    setImageGallery(!imageGallery);
  };

  return (
    <div>
      <div
        className={`w-full h-full z-90 fixed top-0 right-0 transition-transform duration-500 flex flex-col bg-red-500 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Div */}
        <TopBar leftIcon="burger" rightIcon="login" />

        <div className="w-full h-full flex flex-col bg-white relative">
          <PropertyDetailPageTopBar
            title={advertInfo?.Title}
            closePropertyDetailPage={closePropertyDetailPage}
          />

          <div className="mt-1" onClick={showImageGallery}>
            <ImageSlider imageList={advertInfo?.Images} dot_count={4} />
          </div>

          <div className="mx-4 flex-1 flex flex-col gap-[.3rem]">
            {/* address */}
            <p className="text-[14px]">{advertInfo?.Address}</p>

            <div className="w-full flex items-center justify-between ">
              <p className="text-[10px] w-full">
                <span className="text-orange-600 text-[20px] sans-bold mr-1">
                  ${advertInfo?.Price}
                </span>
                /month
              </p>
              <div className="w-full h-6 flex items-center justify-end gap-2 text-orange-600 ">
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
                <div onClick={shareAdvertMe}>
                  <GoShareAndroid className="w-6 h-6 " />
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-[11px] ">{advertInfo?.Description}</p>

            {/* Map */}
            <div className="w-full h-[100px] bg-red-500">
              <MapView properties={[advertInfo]} />
            </div>

            <div className="w-full text-[12px] flex flex-col gap-[.2rem]">
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
          </div>

          {showButtons && (
            <div className="mx-4 h-12">
              <button
                className="w-full my-1 bg-orange-600 text-white rounded-full py-2 cursor-pointer"
                onClick={showChatWithOwnerMe}
              >
                Contact the landlord
              </button>
            </div>
          )}
        </div>

        {/* show map  */}

        {showMap && (
          <div className="w-[300px] h-[300px] absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-full h-full border-1 rounded-2xl">
              <PropertyOnMap
                poi={advertInfo}
                closeMapOverlay={showMapOverlay}
              />
            </div>
          </div>
        )}

        {/* shareView */}
        {shareView && (
          <ShareAdvert closeShareAdvert={shareAdvertMe} advertId={advertId} />
        )}

        {/* show ImageGallery */}
        {imageGallery && (
          <PropertyImageGallery
            images={advertInfo?.Images}
            closePropertyImageGallery={showImageGallery}
          />
        )}
      </div>

      {/* chat with owner */}
      <ChatWithOwner
        advertId={advertId}
        isVisible={showChatWithOwner}
        closeChatWithOwner={showChatWithOwnerMe}
        allowPropertyPage={false}
      />
      {/* chat with owner */}
      <SignIn isVisible={showSignIn} closeSignIn={closeSignIn} />
    </div>
  );
};

export default PropertyDetailPage;
