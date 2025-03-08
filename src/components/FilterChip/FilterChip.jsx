import React, { useState } from "react";

const FilterChip = ({ type, value, chip, userSelection }) => {
  const [isDark, setIsDark] = useState(false);

  const handleSelection = (e) => {
    const target = e.currentTarget;
    setIsDark(true);
    setTimeout(() => {
      userSelection(type, target.id);
    }, 500); // 1-second delay
  };

  const toUpperCase = (str) => {
    if (typeof str !== "string") {
      return str; // Return an empty string if it's not a valid string
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div
      className={`text-black py-1 px-4 rounded-2xl text-[.8rem] cursor-pointer border border-orange-400 
        transition-colors duration-500 ${
          isDark ? "bg-black text-white" : "bg-white text-black"
        }`}
      onClick={handleSelection}
      id={value}
    >
      {toUpperCase(chip.value)}
      {type == "DISTANCE_FILTER"
        ? " Km"
        : type == "PROPERTY_SIZE_FILTER"
        ? " m²"
        : ""}
    </div>
  );
};

export default FilterChip;
