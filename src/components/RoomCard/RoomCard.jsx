import roomImg1 from "../../assets/room1.jpeg";

const RoomCard = ({ advert, showPropertyInfo }) => {
  const { Id, Title, Address, Description, Images, IsFavorite, Price } = advert;

  const handleClick = () => {
    showPropertyInfo(Id);
  };

  function truncateString(str) {
    let len = 100;
    if (str.length <= len) return str;
    return str.slice(0, len) + "...";
  }

  return (
    <div className="border border-orange-200 rounded-xl p-4 min-w-[280px] w-[280px] shadow-[10px_2px_12px_rgba(0,0,0,.1)]">
      <div className="text-sm flex flex-col gap-2">
        <p className="font-bold h-10 ">{Title}</p>
        <p className="text-[10px]">{Address}</p>
        <p className="text-[10px] h-11 ">{truncateString(Description)}</p>
        <p className="text-xs">
          <span className="text-sm text-orange-600">${Price}</span> / month
        </p>
        <div className="flex flex-row items-center justify-between">
          <img
            src={Images[0]}
            className="w-[7.2rem] h-[6rem] object-cover rounded-lg"
          />
          <img
            src={Images[1]}
            className="w-[7.2rem] h-[6rem] object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-2 pt-2">
          <button
            className="w-full text-xs bg-orange-600 text-white py-[.5rem] rounded-full"
            onClick={handleClick}
          >
            View Room
          </button>
          {/* <button
            className="w-full text-xs bg-[#ffeeea] text-[#fe7d61] py-[.5rem] rounded-full"
            onClick={handleClick}
          >
            View Room
          </button> */}
          {/* <button className="w-full text-xs bg-orange-600 text-black py-[.5rem] rounded-full">
            Contact
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
