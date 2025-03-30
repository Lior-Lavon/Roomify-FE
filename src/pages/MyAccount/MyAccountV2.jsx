import React, { useEffect, useRef, useState } from "react";
import { Pencil, Check } from "lucide-react";
import FemaleImage from "../../assets/female.jpg";
import { InputField, RoomCardMini, TopBar } from "../../components";
import usePreventPullToRefresh from "../../utils/hooks/usePreventPullToRefresh";
import { IoMdCheckmark } from "react-icons/io";

const MyAccountV2 = () => {
  const topRef = useRef(null);
  const scrollRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [profileType, setProfileType] = useState("Landlord");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleProfileTypeChange = (type) => {
    setProfileType(type);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (topRef.current) {
        const topBottom = topRef.current.getBoundingClientRect().bottom;
        const bottomTop = window.innerHeight;
        setHeight(bottomTop - topBottom - 20); // Calculate space between them
      }
    };

    updateHeight();
  }, []);

  return (
    <div className="w-full h-screen min-h-screen-ios">
      {/* Top Div */}
      <TopBar leftIcon="burger" />

      <p className="pl-4 mt-2 mb-1 text-lg sans-bold text-orange-600">
        My Account
      </p>

      {/* Profile Picture and Name */}
      <div className="flex mt-4 flex-col items-center" ref={topRef}>
        <img
          src={FemaleImage}
          alt="Profile"
          className="w-20 h-20 object-cover rounded-full mb-2"
        />
        <h2 className="text-xl font-semibold">Jacky Varsano</h2>
      </div>

      <div
        className="w-full mt-4 overflow-y-auto overflow-hidden bg-red-300"
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

export default MyAccountV2;

function SelectField({ label, options = [], value, onChange }) {
  return (
    <div className="relative">
      <label className="text-sm text-gray-500 block mb-1">{label}</label>
      <select
        className="w-full appearance-none px-4 py-3 text-sm rounded-2xl border border-gray-300 focus:outline-none pr-10"
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* Custom arrow */}
      <div className="pointer-events-none absolute right-3 top-1/2 text-gray-500">
        ▼
      </div>
    </div>
  );
}

function SearchableMultiSelectField({ label, options = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSelect = (option) => {
    if (!selectedItems.includes(option)) {
      setSelectedItems([...selectedItems, option]);
    }
    setSearchTerm(""); // Clear search term after selection
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  const handleRemove = (option) => {
    setSelectedItems(selectedItems.filter((item) => item !== option));
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <label className="text-sm text-gray-500 block mb-1">{label}</label>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownVisible(true); // Show dropdown when typing
        }}
        onFocus={() => setIsDropdownVisible(true)} // Show dropdown on focus
        className="w-full px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none "
      />
      {isDropdownVisible && (
        <div className="mt-2 border border-gray-300 rounded-lg shadow-lg bg-white">
          {filteredOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <div
            key={item}
            className="flex items-center text-[0.6rem] bg-white text-red-500 px-2 py-1 rounded-full border border-red-500"
          >
            {item}
            <span
              onClick={() => handleRemove(item)}
              className="ml-2 cursor-pointer"
            >
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function YesNoToggle({ label, value, onChange }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (choice) => {
    setSelected(choice);
    onChange && onChange(choice);
  };

  return (
    <div>
      <label className="text-sm text-gray-500 block mb-2">{label}</label>
      <div className="flex gap-2">
        {["Yes", "No", "N/A"].map((option) => (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={`px-4 py-1 rounded-full border text-sm ${
              selected === option
                ? "bg-red-100 text-red-500 border-red-400"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
