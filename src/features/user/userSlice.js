import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const useSlice = createSlice({
  name: "user",
  initialState,
});

export default useSlice.reducer;
