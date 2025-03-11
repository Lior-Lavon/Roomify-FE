import { RoomCard, TopBar } from "../../components";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/chat");
  };

  return (
    <div className="base:hidden sm:block md:hidden w-full h-[100vh] text-3xl sans-regular">
      <TopBar />
      <div className="mt-3 inline-block w-full text-center">
        <h1 className="text-black sans-bold">Welcome to</h1>
        <h1 className="text-orange-600 sans-bold">Roomufy</h1>
        <p className="text-black text-sm mt-2">
          The <span className="text-orange-600 ">new way to search</span> for
        </p>
        <p className="text-black text-sm">rooms for rent today</p>
      </div>
      <div className="mt-2">
        <div className="p-2 flex flex-row gap-2 overflow-auto">
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </div>
      </div>
      <p className="text-center mt-2 text-[12px] text-sm text-gray-400">
        Available rooms to rent near you
      </p>
      <div className="w-full h-22 bg-gray-100 fixed bottom-[0px] rounded-tl-2xl rounded-tr-2xl">
        <div className="mx-8">
          <p className="text-gray-500 text-[10px] pt-3 pb-1">
            Type your search
          </p>
          <button
            onClick={handleSearch}
            className="text-sm bg-gray-300 w-full text-[14px] text-gray-500 rounded-full py-2 cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
