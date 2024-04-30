import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    allProjects: [],
    allProjectMembers: [],
    allProjectAssets: [],
  },
  reducers: {
    fetchAllProjects: (state, action) => {
      state.allProjects = action.payload.data;
    },
    fetchAllProjectMembers: (state, action) => {
      state.allProjectMembers = action.payload.data;
    },
    fetchAllProjectAssets: (state, action) => {
      state.allProjectAssets = action.payload.data;
    },
  },
});

export const {
  fetchAllProjects,
  fetchAllProjectMembers,
  fetchAllProjectAssets,
} = projectSlice.actions;

export default projectSlice.reducer;
