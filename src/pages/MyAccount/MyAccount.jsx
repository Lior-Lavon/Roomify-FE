import React, { useEffect, useRef, useState } from "react";
import { InputField, TopBar } from "../../components";
import FemaleImage from "../../assets/female.jpg";
import { IoMdCheckmark } from "react-icons/io";
import { Eye, EyeOff, Pencil, X } from "lucide-react";

const MyAccount = () => {
  const profileImageRef = useRef();
  const [changePassword, setChangePassword] = useState(false);
  const [accountVerified, setAccountVerified] = useState(false);
  const [height, setHeight] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("1234");

  const handlePressStart = () => {
    setShowPassword(true);
  };
  const handlePressEnd = () => {
    setShowPassword(false);
  };

  useEffect(() => {
    if (profileImageRef.current) {
      const topBottom = profileImageRef.current.getBoundingClientRect().bottom;
      let bottomTop = window.innerHeight;
      setHeight(bottomTop - topBottom - 20); // Calculate space between them
    }

    ///////
    const handleBlur = () => {
      // Give the keyboard a moment to close before resetting
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    };

    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => input.addEventListener("blur", handleBlur));

    return () => {
      inputs.forEach((input) => input.removeEventListener("blur", handleBlur));
    };
  }, []);

  return (
    <div className="w-full h-screen min-h-screen-ios">
      {/* Top Div */}
      <TopBar leftIcon="burger" />

      <p
        ref={profileImageRef}
        className="pl-4 mt-2 mb-1 text-lg sans-bold text-orange-600"
      >
        My Account
      </p>

      {/* Profile Picture and Name */}
      {/* <div className="flex mt-4 flex-col items-center" ref={profileImageRef}>
        <img
          src={FemaleImage}
          alt="Profile"
          className="w-20 h-20 object-cover rounded-full mb-2"
        />
        <h2 className="text-xl font-semibold">Jacky Varsano</h2>
      </div> */}

      <div
        className="w-full mt-4 overflow-y-auto overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div className="w-[90%] mx-auto flex flex-col gap-4">
          {/* account verified */}
          <div
            className={`w-full px-4 border border-black   flex items-center justify-between ${
              accountVerified ? "text-green-500" : " bg-black text-white"
            }`}
          >
            <p className="my-2">
              {accountVerified
                ? "This account is verified"
                : "Account not verified !"}
            </p>
            {accountVerified && <IoMdCheckmark className="w-5 h-5" />}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 block mb-1">
              Your email
            </label>
            <div className="w-full px-4 rounded-full flex items-center justify-between text-gray-600">
              <p className="my-2">jacky@gmail.com</p>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 block mb-1">Password</label>
            <div className="flex items-center gap-2">
              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 rounded-full bg-gray-100 focus:outline-none"
                />
                <button
                  type="button"
                  onMouseDown={handlePressStart}
                  onMouseUp={handlePressEnd}
                  onMouseLeave={handlePressEnd}
                  onTouchStart={handlePressStart}
                  onTouchEnd={handlePressEnd}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <Eye size={20} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => setChangePassword((prev) => !prev)}
                className="text-gray-500 hover:text-gray-700"
              >
                {changePassword ? <X size={20} /> : <Pencil size={20} />}
              </button>
            </div>
          </div>

          {changePassword && (
            <div className="flex flex-col gap-4 border border-gray-300 rounded-xl p-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-500 block mb-1">
                  New password
                </label>
                <InputField
                  label=""
                  placeholder="New password"
                  type="password"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-500 block mb-1">
                  Confirm password
                </label>
                <InputField
                  label=""
                  placeholder="Confirm password"
                  type="password"
                />
              </div>
            </div>
          )}
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
