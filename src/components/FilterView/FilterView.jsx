import React from "react";

const FilterView = ({ info, userSelection }) => {
  const handleSelection = (e) => {
    userSelection(info.type, e.currentTarget.id);
  };

  const toUpperCase = (str) => {
    if (typeof str !== "string") {
      return str; // Return an empty string if it's not a valid string
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="w-full my-2 flex flex-col gap-2 mx-4">
      <div className="flex justify-start ">
        <div className="max-w-[300px] p-2 text-sm rounded-tr-2xl rounded-tl-2xl rounded-br-2xl bg-[#f2f2f2] ">
          {info.filterInfo.text}
        </div>
      </div>
      {/* add chips */}
      <div className="flex flex-wrap gap-2 ">
        {info.filterInfo.options.map((chip) => {
          return (
            <div
              key={chip.id}
              className=" text-black py-1 px-4 rounded-2xl text-[.8rem] cursor-pointer border border-orange-400"
              onClick={handleSelection}
              id={chip.value}
            >
              {toUpperCase(chip.value)}
              {info.type == "DISTANCE_FILTER"
                ? "Km"
                : info.type == "PROPERTY_SIZE_FILTER"
                ? "m2"
                : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterView;
