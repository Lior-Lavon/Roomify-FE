import React, { useEffect, useRef, useState } from "react";
import { Pencil, Check } from "lucide-react";
import FemaleImage from "../../assets/female.jpg";
import { InputField, RoomCardMini, TopBar } from "../../components";
import usePreventPullToRefresh from "../../utils/hooks/usePreventPullToRefresh";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const ProfileView = () => {
  const topRef = useRef(null);
  const scrollRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [profileType, setProfileType] = useState("Landlord");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

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
    <div className="w-full h-full">
      <TopBar leftIcon="burger" />

      <p className="pl-4 mt-2 mb-1 text-lg sans-bold text-orange-600">
        My Profile
      </p>

      {/* Profile Picture and Name */}
      <div className="flex flex-col items-center">
        <img
          src={FemaleImage}
          alt="Profile"
          className="w-20 h-20 object-cover rounded-full mb-2"
        />
        <h2 className="text-xl font-semibold">Jacky Varsano</h2>
      </div>

      <div className="w-full h-full">
        <div className="m-4">
          <div className="flex gap-2" ref={topRef}>
            <button
              className={`flex-1 py-2 rounded-full text-sm ${
                profileType === "Tenant"
                  ? "bg-orange-600 text-white font-medium"
                  : "bg-gray-100 text-gray-400"
              }`}
              onClick={() => handleProfileTypeChange("Tenant")}
            >
              Tenant
            </button>
            <button
              className={`flex-1 py-2 rounded-full text-sm ${
                profileType === "Landlord"
                  ? "bg-orange-600 text-white font-medium"
                  : "bg-gray-100 text-gray-400"
              }`}
              onClick={() => handleProfileTypeChange("Landlord")}
            >
              Landlord
            </button>
          </div>
          {profileType === "Landlord" ? (
            <div
              className="w-full flex flex-col gap-4 mt-4 overflow-y-auto overflow-hidden "
              style={{ height: `${height}px` }}
            >
              {/* Owner Type */}
              <SelectField
                label="Owner type"
                options={[
                  "Roommate",
                  "Private Owner",
                  "Real Estate Agent",
                  "N/A",
                ]}
              />

              {/* Description */}
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Description
                </label>
                <textarea
                  className="w-full rounded-2xl border border-gray-300 p-3 text-sm"
                  rows={4}
                  defaultValue="About my self About my self About my self About my self"
                />
              </div>

              {/* Living in property */}
              <YesNoToggle label="Living in property" />

              <button className="w-full mt-4 border border-[#ff5733] text-[#ff5733] rounded-full py-2 ">
                Save changes
              </button>
            </div>
          ) : (
            <div
              className="w-full flex flex-col gap-4 mt-4 overflow-y-auto overflow-hidden"
              style={{ height: `${height}px` }}
            >
              {/* Description */}
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Description
                </label>
                <textarea
                  className="w-full rounded-2xl border border-gray-300 p-3 text-sm"
                  rows={4}
                  defaultValue="About my self About my self About my self About my self"
                />
              </div>

              {/* Date of Birth */}
              {/* <InputField label="Date of birth" type="date" /> */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-500 block mb-1">
                  Date of birth
                </label>
                <DatePicker
                  className="w-full border border-gray-300 rounded-2xl py-2 pl-2"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              {/* Spoken Languages (Searchable Dropdown with Tags) */}
              <SearchableMultiSelectField
                label="Spoken languages"
                options={[
                  "English",
                  "Dutch",
                  "Arabic",
                  "Spanish",
                  "French",
                  "German",
                  "Italian",
                ]}
              />
              {/* Living in Country */}
              <SelectField
                label="Country of residence"
                options={["Netherlands", "Germany", "France", "Spain"]}
              />
              {/* Nationality */}
              <SelectField
                label="Nationality"
                options={["Arab", "Dutch", "French", "Other"]}
              />
              {/* Status */}
              <SelectField
                label="Student"
                options={[
                  "Student",
                  "Working Student",
                  "Working",
                  "Looking for a job",
                ]}
              />
              {/* Education level */}
              <SelectField
                label="Status"
                options={["College", "Bachelor", "Master", "...."]}
              />
              {/* Has a Pet */}
              <YesNoToggle label="Pet" />
              {/* Smoking Inside */}
              <YesNoToggle label="Smoking" />
              <button className="w-full mt-6 border border-[#ff5733] text-[#ff5733] rounded-full py-2 ">
                Save changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

function InputFieldV2({
  label,
  type = "text",
  value = "",
  placeholder = "",
  isDisabled = false,
  onChange = () => {},
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleApply = () => {
    setIsEditing(false);
    onChange(inputValue);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {!isEditing ? (
        <>
          <span className="text-sm text-gray-800">
            {inputValue || placeholder}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <Pencil size={18} />
          </button>
        </>
      ) : (
        <>
          <input
            type={type}
            value={inputValue}
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 text-sm rounded-full bg-gray-100 focus:outline-none"
          />
          <button
            onClick={handleApply}
            className="ml-2 text-green-500 hover:text-green-700"
          >
            <Check size={20} />
          </button>
        </>
      )}
    </div>
  );
}

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
