import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  favoritesList: [, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
  },
});

export const { setUserLogin, setUserLogout } = useSlice.actions;
export default useSlice.reducer;
