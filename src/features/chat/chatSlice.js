import { createSlice } from "@reduxjs/toolkit";
import { RoomList } from "../../MockData/RoomList";

const initialState = {
  userPrompt: "some prompt",
  roomList: RoomList,
  chatHistory: [
    {
      id: 1,
      text: "Hello my name is David, is the room still available ?",
      sender: "renter",
    },
    {
      id: 2,
      text: "Hello David, Nice to meet you , My name is Landlord !!",
      sender: "owner",
    },
    {
      id: 3,
      text: "Yes the room is still available , would you like to get more information ?",
      sender: "owner",
    },
    {
      id: 4,
      text: "Yes, would love to, I am working in walking distance from your address, so it seems perfect for me.",
      sender: "renter",
    },
    {
      id: 5,
      text: "Hello my name is David, is the room still available ?",
      sender: "renter",
    },
    {
      id: 6,
      text: "Hello David, Nice to meet you , My name is Landlord !!",
      sender: "owner",
    },
    {
      id: 7,
      text: "Yes the room is still available , would you like to get more information ?",
      sender: "owner",
    },
    {
      id: 8,
      text: "Yes, would love to, I am working in walking distance from your address, so it seems perfect for me.",
      sender: "renter",
    },
    {
      id: 9,
      text: "Hello my name is David, is the room still available ?",
      sender: "renter",
    },
    {
      id: 10,
      text: "Hello David, Nice to meet you , My name is Landlord !!",
      sender: "owner",
    },
    {
      id: 11,
      text: "Yes the room is still available , would you like to get more information ?",
      sender: "owner",
    },
    {
      id: 12,
      text: "Yes, would love to, I am working in walking distance from your address, so it seems perfect for me.",
      sender: "renter",
    },
  ],
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
