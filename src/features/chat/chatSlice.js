import { createSlice } from "@reduxjs/toolkit";
import { RoomList } from "../../MockData/RoomList";

const initialState = {
  userPrompt: "some prompt",
  roomList: RoomList,
  isLoading: true,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserPrompt: (state, { payload }) => {
      state.userPrompt = payload;
    },
    setRoomList: (state, { payload }) => {
      console.log("setRoomList");
    },
  },
});

export const { setUserPrompt, setRoomList } = chatSlice.actions;
export default chatSlice.reducer;
