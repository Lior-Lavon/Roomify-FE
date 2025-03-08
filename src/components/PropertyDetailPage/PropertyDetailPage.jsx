import React from "react";
import { IoMdClose } from "react-icons/io";
import ImageSlider from "../ImageSlider/ImageSlider";
import { PiDivide } from "react-icons/pi";

const PropertyDetailPage = ({ property_info }) => {
  return (
    <div className="w-full h-screen fixed top-0 z-100 flex justify-center items-center sans-regular">
      <div className="max-w-[600px] w-[90%] bg-white rounded-2xl border-[.01rem]">
        <div className="m-4 flex flex-col gap-1">
          <div className="w-full flex flex-row justify-between items-center">
            <div className=" text-base sans-bold">Room name</div>
            <IoMdClose className="text-2xl text-gray-500 cursor-pointer" />
          </div>
          <p className="text-[12px]">Address...</p>
          <p className="text-[11px] ">
            Cozy room for rent in the heart of the city, offering a quiet,
            peaceful setting. Fully furnished with a comfortable bed, desk,
            wardrobe, and more, perfect for work or relaxation.
          </p>
          <p className="text-[10px] w-full">
            <span className="text-orange-600 text-[15px] sans-bold">
              $2,000
            </span>
            /month
          </p>
          {/* image slider */}
          <div className="mt-1">
            <ImageSlider imageList={property_info.Images} dot_count={4} />
          </div>
          <div className="w-full text-[12px] flex flex-col gap-[.15rem]">
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

          {/* buttons */}
          <div className="w-full flex flex-col gap-[.4rem] mt-4 text-sm">
            <div>
              <button className="w-full bg-orange-600 text-black rounded-full py-2 cursor-pointer">
                Contact the landlord
              </button>
            </div>
            <div>
              <button className="w-full bg-[#ffeeeb] text-orange-600 rounded-full py-2 cursor-pointer">
                Search for similar result
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
