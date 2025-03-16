import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  isLoading: true,
};

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state) => {
      state.profile = {};
    },
  },
});

export const { setUserLogin } = useSlice.actions;
export default useSlice.reducer;
