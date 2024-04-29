import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    allProjects: [],
  },
  reducers: {
    fetchAllProjects: (state, action) => {
      state.allProjects = action.payload.data;
    },
  },
});

export const { fetchAllProjects } = projectSlice.actions;

export default projectSlice.reducer;
