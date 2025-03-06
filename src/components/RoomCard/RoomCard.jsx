import roomImg1 from "../../assets/room-1.jpeg";

const RoomCard = () => {
  return (
    <div className="border border-orange-200 rounded-xl p-4 min-w-[280px] w-[280px] shadow-[10px_2px_12px_rgba(0,0,0,.1)]">
      <div className="text-sm flex flex-col gap-1">
        <p className="font-bold">Room name</p>
        <p className="text-[10px]">address ...</p>
        <p className="text-[10px]">A beautiful room in the heart of the city</p>
        <p className="text-xs">
          <span className="text-sm text-orange-600">$2,000</span> / month
        </p>
        <div className="flex flex-row items-center justify-between">
          <img
            src={roomImg1}
            className="w-[7.2rem] h-[6rem] object-cover rounded-lg"
          />
          <img
            src={roomImg1}
            className="w-[7.2rem] h-[6rem] object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-2 pt-2">
          <button className="w-full text-xs bg-[#ffeeea] text-[#fe7d61] py-[.5rem] rounded-full">
            View Room
          </button>
          <button className="w-full text-xs bg-orange-600 text-black py-[.5rem] rounded-full">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
