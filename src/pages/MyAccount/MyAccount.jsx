import React, { useEffect, useRef, useState } from "react";
import { InputField, TopBar } from "../../components";
import FemaleImage from "../../assets/female.jpg";
import { IoMdCheckmark } from "react-icons/io";

const MyAccount = () => {
  const profileImageRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (profileImageRef.current) {
      const topBottom = profileImageRef.current.getBoundingClientRect().bottom;
      let bottomTop = window.innerHeight;
      setHeight(bottomTop - topBottom); // Calculate space between them
    }
  }, []);

  return (
    <div className="w-full h-screen">
      {/* Top Div */}
      <TopBar leftIcon="burger" />

      {/* Profile Picture and Name */}
      <div className="flex mt-4 flex-col items-center" ref={profileImageRef}>
        <img
          src={FemaleImage}
          alt="Profile"
          className="w-20 h-20 object-cover rounded-full mb-2"
        />
        <h2 className="text-xl font-semibold">Jacky Varsano</h2>
      </div>

      <div
        className="w-full mt-4 overflow-y-auto overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div className="w-[90%] mx-auto flex flex-col gap-4">
          {/* account verified */}
          <div className="w-full px-4 bg-gray-100 rounded-full flex items-center justify-between text-green-500">
            <p className="my-2">This account is verified</p>
            <IoMdCheckmark className="w-5 h-5" />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 block mb-1">
              Your email
            </label>
            <div className="w-full px-4 bg-gray-100 rounded-full flex items-center justify-between text-gray-600">
              <p className="my-2">jacky@gmail.com</p>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 block mb-1">
              New password
            </label>
            <InputField label="" placeholder="New password" type="password" />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 block mb-1">
              Repeat password
            </label>
            <InputField
              label=""
              placeholder="Repeat password"
              type="password"
            />
          </div>

          {/* Phone number */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 block mb-1">
              Phone number
            </label>
            <InputField label="" placeholder="Phone number" type="text" />
          </div>

          {/* Save changes */}
          <div className="w-full flex flex-col gap-4 mb-10 mt-4">
            <button className="border border-[#ff5733] text-[#ff5733] rounded-full py-2">
              Save changes
            </button>
            <button className="bg-[#fff6f6] text-[#c10002] rounded-full py-2">
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
