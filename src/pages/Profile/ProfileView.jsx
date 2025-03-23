import React, { useEffect, useRef, useState } from "react";
import FemaleImage from "../../assets/female.jpg";
import { TopBar } from "../../components";
import usePreventPullToRefresh from "../../utils/hooks/usePreventPullToRefresh";

const ProfileView = () => {
  const userNameRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [profileType, setProfileType] = useState("Landlord");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  usePreventPullToRefresh();

  const handleProfileTypeChange = (type) => {
    setProfileType(type);
  };

  useEffect(() => {
    const updateHeight = () => {
      if (userNameRef.current) {
        const topBottom = userNameRef.current.getBoundingClientRect().bottom;
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
        className="w-full max-w-[640px] min-w-[300px] py-4 px-4 overflow-y-auto space-y-4"
        style={{ height: `${height}px` }}
      >
        <InputField label="Your name" value="Jacky Varsano" />
        <InputField label="Your name" value="Jacky Varsano" />
        <InputField label="Your name" value="Jacky Varsano" />
        <InputField label="Your name" value="Jacky Varsano" />
        <InputField label="Your name" value="Jacky Varsano" />
        <InputField label="Your name" value="Jacky Varsano" />
        <InputField label="Your name" value="Jacky Varsano" />
        <InputField label="Your email" value="jackyvarsano@gmail.com" />
        {/* <InputField label="Your password" type="password" value="*********" /> */}
        {/* Update Password Section */}
        <div className="w-full">
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
            className={`overflow-hidden transition-max-height duration-300 space-y-4  ${
              showPasswordFields ? "max-h-50" : "max-h-0"
            }`}
          >
            <div className="w-full p-2 border-1 border-gray-200 rounded-xl space-y-4">
              <InputField label="" placeholder="Password" type="password" />
              <InputField
                label="Retype password"
                placeholder="Password"
                type="password"
              />
            </div>
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

        <button
          className={`w-full py-2 rounded-full text-sm bg-red-50 text-red-500 font-medium`}
          onClick={() => {}}
        >
          Update
        </button>
        {/* </div> */}
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
        className="w-full px-4 py-3 text-sm rounded-full bg-gray-100 focus:outline-none"
      />
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
