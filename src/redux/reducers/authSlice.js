import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.data.token;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
