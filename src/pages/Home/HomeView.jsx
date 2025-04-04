import { useEffect, useRef, useState } from "react";
import {
  Prompt,
  PropertyDetailPage,
  RoomCard,
  ShareAdvert,
  TopBar,
} from "../../components";
import useKeyboardStatus from "../../utils/hooks/useViewportHeight";
import { useSelector } from "react-redux";
import ChatWithOwner from "../../components/ChatWithOwner/ChatWithOwner";
import ChatView from "../Chat/ChatView";

// fixed top-[17rem]
const HomeView = () => {
  const { isKeyboardOpen, keyboardHeight } = useKeyboardStatus();
  const topBarRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [shareView, setShareView] = useState({ show: false, advertId: 0 });
  const [showAdvertInfo, setShowAdvertInfo] = useState({
    show: false,
    advertId: 0,
  });
  const [showChatView, setShowChatView] = useState(false);

  const { roomList } = useSelector((store) => store.chat);

  // useEffect(() => {
  //   console.log("isKeyboardOpen : ", isKeyboardOpen);
  //   console.log("keyboardHeight : ", keyboardHeight);
  // }, [isKeyboardOpen, keyboardHeight]);

  const showPropertyInfo = (advertId) => {
    if (showAdvertInfo.show == false) {
      setShowAdvertInfo({ show: true, advertId: advertId });
    } else {
      setShowAdvertInfo({ show: false, advertId: 0 });
    }
  };

  useEffect(() => {
    if (topBarRef.current) {
      const topBottom = topBarRef.current.getBoundingClientRect().bottom;
      // const bottomTop = bottomRef.current.getBoundingClientRect().top;
      const bottomTop = window.innerHeight;
      setHeight(bottomTop - topBottom); // Calculate space between them
    }
  }, []);

  const shareAdvert = (advertId) => {
    setShareView({ show: true, advertId: advertId });
  };
  const closeShareAdvert = () => {
    setShareView({ show: false, advertId: 0 });
  };

  const showChatWithOwner = (advertId) => {
    showPropertyInfo(advertId);

    setShowChat(!showChat);
  };
  const hideChatWithOwner = () => {
    setShowChat(!showChat);
  };

  const openChatView = (prompt) => {
    console.log("prompt : ", prompt);

    setShowChatView(true);
  };

  return (
    <div className="w-full h-full flex">
      <div
        className={`base:hidden sm:block md:hidden w-full h-full relative text-3xl sans-regular `}
      >
        <div ref={topBarRef} className="w-full">
          <TopBar leftIcon="burger" rightIcon="login" />
        </div>

        {/* body */}
        <div
          className="w-full h-full overflow-y-auto "
          style={{ height: `${height}px` }}
        >
          <div className="pt-22 w-full inline-block text-center">
            <h1 className="text-transparent bg-gradient-to-r from-[#261a18] to-[#ff5733] bg-clip-text font-bold text-2lg ">
              Welcome to Roomify
            </h1>
            <p className="text-[#7b7b7b] text-[15px] mt-2">
              Find your perfect rental.
            </p>
          </div>

          <div className={`w-full mt-16`}>
            <Prompt openChatView={openChatView} />

            <div className="mt-10">
              <p className="text-center px-2 text-lg text-black">
                Recent listings
              </p>

              <div className="p-2 flex flex-row gap-2 overflow-auto">
                {roomList.map((advert) => {
                  return (
                    <RoomCard
                      key={advert.Id}
                      advert={advert}
                      showPropertyInfo={showPropertyInfo}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* shareView */}
        {/* {shareView.show && (
          <ShareAdvert
            closeShareAdvert={closeShareAdvert}
            advertId={shareView.advertId}
          />
        )} */}
      </div>

      {/* show property view */}
      <PropertyDetailPage
        isVisible={showAdvertInfo.show}
        advertId={showAdvertInfo.advertId}
        closePropertyDetailPage={showPropertyInfo}
        showPropertyInfo={showPropertyInfo}
        showButtons={true}
      />

      {/* show property view */}
      <ChatView
        isVisible={showChatView}
        closeChatViewPage={() => setShowChatView(false)}
      />
    </div>
  );
};

export default HomeView;

// ${
//           keyboardHeight > 0 ? `top-[${getKeyboardHeight()}px]` : ""
//         }
