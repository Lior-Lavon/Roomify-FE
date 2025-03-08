import React, { useState } from "react";
import FilterChip from "../FilterChip/FilterChip";

const FilterView = ({ info, userSelection }) => {
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
            <FilterChip
              key={chip.id}
              type={info.type}
              value={chip.value}
              chip={chip}
              userSelection={userSelection}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilterView;
