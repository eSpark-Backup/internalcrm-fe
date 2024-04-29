import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    allTeams: [],
  },
  reducers: {
    fecthAllTeams: (state, action) => {
      state.allTeams = action.payload.data;
    },
  },
});

export const { fecthAllTeams } = teamSlice.actions;

export default teamSlice.reducer;
