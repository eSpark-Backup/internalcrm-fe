import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    childData: null,
  },
  reducers: {
    storeChildData: (state, action) => {
      state.childData = action.payload;
    },
  },
});

export const { storeChildData } = headerSlice.actions;

export default headerSlice.reducer;
