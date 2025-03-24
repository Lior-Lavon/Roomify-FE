import React, { useEffect, useRef, useState } from "react";
import { PropertyDetailPage, RoomCardMini, TopBar } from "../../components";
import { useSelector } from "react-redux";

const FavoritesView = () => {
  const myFavoritesRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [showPropertyDetailPage, setShowPropertyDetailPage] = useState({
    show: false,
    advertId: 0,
  });

  const { favoritesList } = useSelector((store) => store.user);
  console.log("favoritesList : ", favoritesList);

  const { roomList } = useSelector((store) => store.chat);

  useEffect(() => {
    if (myFavoritesRef.current) {
      const topBottom = myFavoritesRef.current.getBoundingClientRect().bottom;
      // const bottomTop = bottomRef.current.getBoundingClientRect().top;
      const bottomTop = window.innerHeight;
      setHeight(bottomTop - topBottom); // Calculate space between them
    }
  }, []);

  const showPropertyInfo = (advertId) => {
    if (!showPropertyDetailPage.show) {
      setShowPropertyDetailPage({ show: true, advertId });
    } else {
      setShowPropertyDetailPage({ show: false, advertId: -1 });
    }
  };

  const getRoomById = (advertId) => {
    const advert = roomList.find((advert) => advert.Id == advertId);
    return advert;
  };

  return (
    <div>
      <div className="w-full h-full">
        <TopBar leftIcon="burger" />

        <p
          ref={myFavoritesRef}
          className="pl-4 mt-2 mb-1 text-lg sans-bold text-orange-600"
        >
          My Favorites
        </p>

        {/* body */}
        <div
          className="w-full py-2 overflow-y-auto flex flex-col gap-2 items-center"
          style={{ height: `${height}px` }}
        >
          {favoritesList.map((itemId) => {
            const advert = getRoomById(itemId);
            return (
              <RoomCardMini
                key={advert.Id}
                advertInfo={advert}
                showPropertyInfo={showPropertyInfo}
              />
            );
          })}
        </div>
      </div>

      {/* show property view */}
      <PropertyDetailPage
        isVisible={showPropertyDetailPage.show}
        advertId={showPropertyDetailPage.advertId}
        closePropertyDetailPage={showPropertyInfo}
        showButtons={true}
      />
    </div>
  );
};

export default FavoritesView;
