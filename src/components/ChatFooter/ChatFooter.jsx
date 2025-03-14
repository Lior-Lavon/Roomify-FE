import React, { useState, useEffect, memo } from "react";
import { VscTriangleRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserPrompt } from "../../features/chat/chatSlice";

const placeholders = [
  "I am searching for a room ...",
  "I need a room in ...",
  "@Lior, please send me some  ",
];

const ChatFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholder text every 3 seconds when not focused
  useEffect(() => {
    if (!isFocused) {
      const interval = setInterval(() => {
        setPlaceholderIndex(
          (prevIndex) => (prevIndex + 1) % placeholders.length
        );
      }, 3000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isFocused]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const submitPrompt = () => {
    // setIsFocused(false);

    // update the store
    dispatch(setUserPrompt(text));

    setTimeout(() => {
      navigate("/chat");
    }, 600);
  };

  return (
    <div
      className={`w-full rounded-tl-2xl rounded-tr-2xl transition-all duration-500 ${
        isFocused ? "h-22" : "h-12"
      } bg-gray-100`}
    >
      <div className="mx-2 relative">
        <div className="relative">
          <textarea
            onChange={handleChange}
            value={text}
            placeholder={!isFocused ? placeholders[placeholderIndex] : ""}
            className={`w-full bg-white py-1 px-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-500 resize-none leading-tight pr-10 mt-2`}
            style={{
              maxHeight: isFocused ? "70px" : "30px",
              height: isFocused ? "70px" : "30px",
            }}
            // onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
          />

          <div
            onClick={submitPrompt}
            className={`absolute bottom-3 right-1 w-8 h-6 flex items-center justify-center rounded-xl bg-orange-600 transition-all duration-500 ${
              isFocused ? "opacity-100 scale-100" : "opacity-0 scale-75"
            } `}
          >
            <VscTriangleRight className="text-[18px] text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatFooter);
