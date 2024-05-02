import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    allProjects: [],
    allProjectMembers: [],
    allProjectAssets: [],
    allProjectCards: [],
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
    fetchAllProjectCards: (state, action) => {
      state.allProjectCards = action.payload.data;
    },
  },
});

export const {
  fetchAllProjects,
  fetchAllProjectMembers,
  fetchAllProjectAssets,
  fetchAllProjectCards,
} = projectSlice.actions;

export default projectSlice.reducer;
