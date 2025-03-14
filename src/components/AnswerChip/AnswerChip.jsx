import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

const AnswerChip = ({ filter, removeFilter }) => {
  const deleteTag = () => {
    removeFilter(filter.question);
  };

  return (
    <div className="relative">
      <p className="inline-block bg-white text-[.75rem] text-black border py-1 px-2 rounded-full">
        {(() => {
          switch (filter.question) {
            case "PROPERTY_TYPE_FILTER":
              return (
                filter.answer.charAt(0).toUpperCase() + filter.answer.slice(1)
              );
            case "DISTANCE_FILTER":
              return `${filter.answer} km`;
            case "PROPERTY_SIZE_FILTER":
              return `${filter.answer} m²`;
            case "PRICE_FILTER":
              return `$ ${filter.answer}`;
            default:
              return filter.answer;
          }
        })()}
      </p>
      <IoMdCloseCircle
        className="absolute w-[24px] h-[24px] right-[-10px] top-[-10px] p-[2px]"
        onClick={deleteTag}
      />
    </div>
  );
};

export default AnswerChip;
