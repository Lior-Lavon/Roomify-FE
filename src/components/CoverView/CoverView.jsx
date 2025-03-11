import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { setSecurityTokenInLocalStorage } from "../../utils/localStorage";

const CoverView = ({ removeSecurityHandler }) => {
  const [code, setCode] = useState("");
  const accessCode = import.meta.env.VITE_SECURITY_CODE;
  const handleChange = (e) => {
    const code = e.target.value;
    setCode(code);
  };

  return (
    <div className="fixed top-0 w-full h-screen bg-white z-100">
      <div className="max-w-[320px] w-[90%] mx-auto mt-20 bg-gray-100 rounded-2xl flex flex-col p-4 shadow-[10px_2px_12px_rgba(0,0,0,.1)]">
        <h3 className="section-title">Access code</h3>
        <div className="flex justify-between items-center gap-2 my-4">
          <input
            type="text"
            name="monthly_rent"
            placeholder="code ... "
            className="w-full bg-white px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-gray-200 outline-none transition-all duration-200"
            onChange={handleChange}
          />
          <button
            className="px-4 py-1 bg-orange-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 cursor-pointer"
            onClick={(e) => {
              if (accessCode == code) {
                const hashedPassword = bcrypt.hashSync(
                  code,
                  "$2a$10$CwTycUXWue0Thq9StjUM0u"
                );
                setSecurityTokenInLocalStorage(hashedPassword);
                removeSecurityHandler(false);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default CoverView;
