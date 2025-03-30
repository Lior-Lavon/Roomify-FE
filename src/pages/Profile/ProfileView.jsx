import React, { useEffect, useRef, useState } from "react";
import { Pencil, Check } from "lucide-react";
import FemaleImage from "../../assets/female.jpg";
import { InputField, RoomCardMini, TopBar } from "../../components";
import usePreventPullToRefresh from "../../utils/hooks/usePreventPullToRefresh";

const ProfileView = () => {
  const profileImageRef = useRef(null);
  const scrollRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [profileType, setProfileType] = useState("Landlord");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleProfileTypeChange = (type) => {
    setProfileType(type);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (profileImageRef.current) {
        const topBottom =
          profileImageRef.current.getBoundingClientRect().bottom;
        const bottomTop = window.innerHeight;
        setHeight(bottomTop - topBottom); // Calculate space between them
      }
    };

    updateHeight();

    // window.addEventListener("resize", updateHeight);
    // return () => {
    //   window.removeEventListener("resize", updateHeight);
    // };
  }, []);

  const togglePasswordFields = () => {
    setShowPasswordFields((prev) => !prev);
  };

  useEffect(() => {
    const el = scrollRef.current;

    const clampScroll = () => {
      if (el.scrollTop > el.scrollHeight - el.clientHeight) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      }
    };

    el.addEventListener("touchstart", clampScroll);
    return () => el.removeEventListener("touchstart", clampScroll);
  }, []);

  return (
    <div className="w-full h-full">
      <TopBar leftIcon="burger" />
      <p className="pl-4 mt-2 mb-1 text-lg sans-bold text-orange-600">
        My Profile
      </p>
      {/* Profile Picture and Name */}
      <div className="flex flex-col items-center" ref={profileImageRef}>
        <img
          src={FemaleImage}
          alt="Profile"
          className="w-20 h-20 object-cover rounded-full mb-2"
        />
        <h2 className="text-xl font-semibold">Jacky Varsano</h2>
      </div>

      {/* body */}
      <div
        className="w-full max-w-[640px] min-w-[300px] py-4 px-4 overflow-y-auto space-y-4 "
        ref={scrollRef}
        // style={{ height: `${height + 1}px` }}
        style={{
          height: `${height}px`,
          maxHeight: `${height}px`,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* <InputField label="Your name" value="Jacky Varsano" /> */}
        <InputFieldV2
          label="Your name"
          value="Jacky Varsano"
          placeholder="Enter your name"
          onChange={(val) => console.log("New value:", val)}
        />

        <InputFieldV2
          label="Your email"
          value="jackyvarsano@gmail.com"
          placeholder="Enter your name"
          onChange={(val) => console.log("New value:", val)}
        />
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

        {/* <InputField label="City" value="Amstelveen" /> */}

        {/* Profile Type Toggle */}
        <label className="text-sm text-gray-500 block mb-2">Profile type</label>

        <div className="flex gap-2">
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

        {/* Tenant properties */}
        {profileType == "Tenant" && (
          <div className="w-full space-y-4 mt-4">
            {/* Date of Birth */}
            <InputField label="Date of birth" type="date" />
            {/* Nationality */}
            <SelectField
              label="Nationality"
              options={["Arab", "Dutch", "French", "Other"]}
            />
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

            {/* Speaks Languages (Searchable Dropdown with Tags) */}
            <SearchableMultiSelectField
              label="Speaks languages"
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
              label="Living in country"
              options={["Netherlands", "Germany", "France", "Spain"]}
            />
            {/* Status */}
            <SelectField
              label="Status"
              options={[
                "Student",
                "Working Student",
                "Working",
                "Looking for a job",
              ]}
            />
            {/* Has a Pet */}
            <YesNoToggle label="Has a pet" />
            {/* Smoking Inside */}
            <YesNoToggle label="Smoking inside" />
            {/* Member of Student Association */}
            <YesNoToggle label="Member of student association" />
          </div>
        )}

        <div className="w-full h-[.25rem] bg-gray-200 rounded-full"></div>

        {/* submit button */}
        <button
          className={`w-full py-2 rounded-full text-sm bg-red-50 text-red-500 font-medium`}
          onClick={() => {}}
        >
          Update
        </button>
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
        className="w-full appearance-none px-4 py-3 text-sm rounded-full border border-gray-300 focus:outline-none pr-10"
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
            className="flex items-center bg-red-100 text-red-500 px-2 py-1 rounded-full"
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
        {["Yes", "No"].map((option) => (
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
