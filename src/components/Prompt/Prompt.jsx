import React, { useState, useEffect, memo, useRef } from "react";
import { VscTriangleRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserPrompt } from "../../features/chat/chatSlice";
import useKeyboardStatus from "../../utils/hooks/useViewportHeight";

const placeholders = [
  "I am searching for a room ...",
  "I need a room in ...",
  "@Lior, please send me some  ",
];

const Prompt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isKeyboardOpen, keyboardHeight } = useKeyboardStatus();
  const textareaRef = useRef(null);
  const [text, setText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholder text every 3 seconds when not focused
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    console.log("isKeyboardOpen : ", isKeyboardOpen);
    console.log("keyboardHeight : ", keyboardHeight);
  }, [isKeyboardOpen, keyboardHeight]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const submitPrompt = () => {
    // update the store
    dispatch(setUserPrompt(text));

    setTimeout(() => {
      navigate("/chat");
    }, 600);
  };

  return (
    <div
      className={`w-full rounded-tl-2xl rounded-tr-2xl transition-all duration-500 mt-20`}
      ref={textareaRef}
    >
      <div className="mx-2 relative">
        <div className="relative">
          <textarea
            onChange={handleChange}
            value={text}
            placeholder={placeholders[placeholderIndex]}
            className={`w-full h-[4.3rem] max-h-[4.3rem]  bg-white py-1 px-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all duration-500 resize-none leading-tight pr-10`}
            // onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
          />

          <div
            onClick={submitPrompt}
            className={`absolute bottom-3 right-1 w-8 h-6 flex items-center justify-center rounded-xl bg-orange-600 transition-all duration-500 opacity-100 scale-100 `}
          >
            <VscTriangleRight className="text-[18px] text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Prompt);
