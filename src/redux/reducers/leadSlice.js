import { createSlice } from "@reduxjs/toolkit";

const leadSlice = createSlice({
  name: "leads",
  initialState: {
    allLeads: [],
  },
  reducers: {
    fetchAllLeads: (state, action) => {
      state.allLeads = action.payload.data;
    },
  },
});

export const { fetchAllLeads } = leadSlice.actions;

export default leadSlice.reducer;
