import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPrompt: "some prompt",
  isLoading: true,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserPrompt: (state, { payload }) => {
      state.userPrompt = payload;
    },
  },
});

export const { setUserPrompt } = chatSlice.actions;
export default chatSlice.reducer;
