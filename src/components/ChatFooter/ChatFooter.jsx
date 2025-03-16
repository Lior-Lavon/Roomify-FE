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
      className={`w-full transition-all duration-500 bg-white ${
        isFocused ? "h-22" : "h-12"
      } bg-gray-100`}
    >
      <div className="mx-2 pt-1 relative">
        <div className="relative">
          <textarea
            onChange={handleChange}
            value={text}
            placeholder={!isFocused ? placeholders[placeholderIndex] : ""}
            className={`w-[100%] h-10 mx-auto bg-white py-2 px-2 text-base border border-gray-300 rounded-full outline-none leading-tight`}
            // style={{
            //   maxHeight: isFocused ? "70px" : "30px",
            //   height: isFocused ? "70px" : "30px",
            // }}
            // onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
          />

          <div
            onClick={submitPrompt}
            className={`absolute bottom-[.9rem] right-1 w-8 h-6 flex items-center justify-center rounded-xl bg-orange-600`}
          >
            <VscTriangleRight className="text-[18px] text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatFooter);

{
  /* <div className="w-[90%] mx-auto py-2 relative" ref={topRef}>
  <input
    type="text"
    // name="chat"
    placeholder="Search chats"
    className="w-full h-10 bg-white border border-gray-300 rounded-full shadow-sm outline-none pl-10 "
    // onChange={handleChange}
  />
  <div className="absolute left-2 top-1/2 -translate-y-1/2">
    <CiSearch className="text-2xl text-gray-500" />
  </div>
</div>; */
}
