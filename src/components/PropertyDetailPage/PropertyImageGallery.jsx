import "react-image-gallery/styles/css/image-gallery.css";
import React from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import ImageGallery from "react-image-gallery";

import Image1 from "../../assets/room1.jpeg";
import Image2 from "../../assets/room2.jpeg";
import Image3 from "../../assets/room3.jpeg";
import Image4 from "../../assets/room4.jpeg";
import Image5 from "../../assets/room5.jpeg";
import Image6 from "../../assets/room6.jpeg";
import Image7 from "../../assets/room7.jpeg";
import { IoMdClose } from "react-icons/io";

const images = [
  {
    original: Image1,
    thumbnail: Image1,
  },
  {
    original: Image2,
    thumbnail: Image2,
  },
  {
    original: Image3,
    thumbnail: Image3,
  },
  {
    original: Image4,
    thumbnail: Image4,
  },
  {
    original: Image5,
    thumbnail: Image5,
  },
  {
    original: Image6,
    thumbnail: Image6,
  },
];

const getHeight = () => {
  return "mt-[120px]";
};
const PropertyImageGallery = ({ closePropertyImageGallery }) => {
  return (
    <div className="w-full h-full absolute top-0 bg-gray-300">
      <div className={`w-[94%] mx-auto h-full ${getHeight()}`}>
        <div className="w-full h-10 flex flex-row items-center justify-between ">
          <p>Room name</p>
          <IoMdClose
            className="text-2xl text-gray-500 cursor-pointer "
            onClick={closePropertyImageGallery}
          />
        </div>
        {images.length > 0 ? (
          <ImageGallery items={images} />
        ) : (
          <div className="placeholder">
            <div className="placeholder-icon-container">
              <HiOutlinePhoto className="placeholder-icon" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyImageGallery;
