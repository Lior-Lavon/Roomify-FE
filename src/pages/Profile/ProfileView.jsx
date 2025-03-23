import React, { useEffect, useRef, useState } from "react";
import FemaleImage from "../../assets/female.jpg";
import { TopBar } from "../../components";

const ProfileView = () => {
  const userNameRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [profileType, setProfileType] = useState("Landlord");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleProfileTypeChange = (type) => {
    setProfileType(type);
  };

  useEffect(() => {
    if (userNameRef.current) {
      const topBottom = userNameRef.current.getBoundingClientRect().bottom;
      // const bottomTop = bottomRef.current.getBoundingClientRect().top;
      const bottomTop = window.innerHeight;
      setHeight(bottomTop - topBottom); // Calculate space between them
    }
  }, []);

  const togglePasswordFields = () => {
    setShowPasswordFields((prev) => !prev);
  };

  return (
    <div className="w-full h-full">
      <TopBar leftIcon="burger" />

      <p className="pl-4 mt-2 mb-1 text-lg sans-bold text-orange-600">
        My Profile
      </p>

      {/* Profile Picture and Name */}
      <div className="flex flex-col items-center">
        <img
          ref={userNameRef}
          src={FemaleImage}
          alt="Profile"
          className="w-20 h-20 object-cover rounded-full mb-2"
        />
        <h2 className="text-xl font-semibold">Jacky Varsano</h2>
      </div>

      {/* body */}
      <div
        className="w-full py-2 overflow-y-auto flex flex-col gap-2 items-center"
        style={{ height: `${height}px` }}
      >
        <div className="w-full max-w-[640px] min-w-[300px] px-4 mb-10 space-y-4">
          <InputField label="Your name" value="Jacky Varsano" />
          <InputField label="Your email" value="jackyvarsano@gmail.com" />
          {/* <InputField label="Your password" type="password" value="*********" /> */}
          {/* Update Password Section */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={togglePasswordFields}
            >
              <label className="text-sm text-gray-500 block mb-2">
                Update password
              </label>
              <span
                className={`transform transition-transform duration-300 ${
                  showPasswordFields ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>
            <div
              className={`overflow-hidden transition-max-height duration-300 space-y-4 ${
                showPasswordFields ? "max-h-50" : "max-h-0"
              }`}
            >
              <InputField label="" placeholder="Password" type="password" />
              <InputField
                label="Retype password"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-2xl border border-gray-300 p-3 text-sm"
              rows={3}
              defaultValue="About my self About my self About my self About my self"
            />
          </div>

          {/* <InputField label="Phone number" vsalue="0625484441" /> */}
          {/* <InputField label="Your address" value="Boogschutter 12" /> */}
          <InputField label="City" value="Amstelveen" />

          {/* Profile Type Toggle */}
          <div>
            <label className="text-sm text-gray-500 block mb-2">
              Profile type
            </label>
            <div className="flex gap-2">
              <button
                className={`flex-1 py-2 rounded-full text-sm ${
                  profileType === "Tenant"
                    ? "bg-red-50 text-red-500 font-medium"
                    : "bg-gray-100 text-gray-400"
                }`}
                onClick={() => handleProfileTypeChange("Tenant")}
              >
                Tenant
              </button>
              <button
                className={`flex-1 py-2 rounded-full text-sm ${
                  profileType === "Landlord"
                    ? "bg-red-500 text-white font-medium"
                    : "bg-gray-100 text-gray-400"
                }`}
                onClick={() => handleProfileTypeChange("Landlord")}
              >
                Landlord
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className={`flex-1 py-2 rounded-full text-sm bg-red-50 text-red-500 font-medium`}
              onClick={() => handleProfileTypeChange("Tenant")}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

// InputField Component
function InputField({ label, type = "text", value = "", placeholder = "" }) {
  return (
    <div>
      <label className="text-sm text-gray-500 block mb-1">{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        disabled
        className="w-full px-4 py-3 text-sm rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>
  );
}
