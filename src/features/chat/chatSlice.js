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
    setIsFavorite: (state, { payload }) => {
      const advertId = payload;
      const tmpList = [...state.roomList];
      for (let i = 0; i < tmpList.length; i++) {
        if (tmpList[i].Id == advertId) {
          tmpList[i].IsFavorite = !tmpList[i].IsFavorite;
          break;
        }
      }
      state.roomList = [...tmpList];
    },
  },
});

export const { setUserPrompt, setIsFavorite } = chatSlice.actions;
export default chatSlice.reducer;
