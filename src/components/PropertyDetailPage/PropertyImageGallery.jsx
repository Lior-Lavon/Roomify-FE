import "react-image-gallery/styles/css/image-gallery.css";
import React from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import ImageGallery from "react-image-gallery";

import Image1 from "../../assets/room1.jpeg";
import Image2 from "../../assets/room2.jpeg";
import Image3 from "../../assets/room3.jpeg";
// import Image4 from "../assets/room4.jpeg";
// import Image5 from "../assets/room5.jpeg";
// import Image6 from "../assets/room6.jpeg";
// import Image7 from "../assets/room7.jpeg";

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
];
const PropertyImageGallery = () => {
  return (
    <div className="w-full h-full absolute top-0 rounded-xl bg-white">
      <div className="!w-full ">
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
