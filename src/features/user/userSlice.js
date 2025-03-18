import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  returnToAfterLogin: null,
  isLoading: true,
};

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state) => {
      state.profile = {};
    },
    setReturnToAfterLogin: (state, { payload }) => {
      state.returnToAfterLogin = payload;
    },
  },
});

export const { setUserLogin, setReturnToAfterLogin } = useSlice.actions;
export default useSlice.reducer;
