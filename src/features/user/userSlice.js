import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  returnToAfterLogin: null,
  favoritesList: [, 1, 2, 3, 4, 5, 6],
  isLoading: true,
};

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state) => {
      state.profile = {};
    },
    setUserLogout: (state) => {
      state.profile = null;
    },

    setReturnToAfterLogin: (state, { payload }) => {
      state.returnToAfterLogin = payload;
    },
  },
});

export const { setUserLogin, setUserLogout, setReturnToAfterLogin } =
  useSlice.actions;
export default useSlice.reducer;
