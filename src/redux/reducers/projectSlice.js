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
    // Project Reducers
    fetchAllProjects: (state, action) => {
      state.allProjects = action.payload.data;
    },
    createUpdateProject: (state, action) => {
      const findPrevProject = state.allProjects?.findIndex(
        (project) => project.id === action.payload.id
      );

      if (findPrevProject === -1) {
        state.allProjects = [...state.allProjects, { ...action.payload }];
      } else {
        state.allProjects[findPrevProject] = action.payload;
      }
    },
    deleteProjectReducer: (state, action) => {
      const findPrevProject = state.allProjects?.filter(
        (project) => project.id !== action.payload
      );

      if (findPrevProject.length) {
        state.allProjects = findPrevProject;
      } else {
        state.allProjects = [];
      }
    },
    // Ends Project Reducers

    fetchAllProjectMembers: (state, action) => {
      state.allProjectMembers = action.payload.data;
    },

    // Project Assets Reducers
    fetchAllProjectAssets: (state, action) => {
      state.allProjectAssets = action.payload.data;
    },
    createUpdateProjectAsset: (state, action) => {
      const findPrevProjectAsset = state.allProjectAssets?.findIndex(
        (asset) => asset.id === action.payload.id
      );

      if (findPrevProjectAsset === -1) {
        state.allProjectAssets = [
          { ...action.payload },
          ...state.allProjectAssets,
        ];
      } else {
        state.allProjectAssets[findPrevProjectAsset] = action.payload;
      }
    },
    deleteProjectAssetReducer: (state, action) => {
      const findPrevProjectAsset = state.allProjectAssets?.filter(
        (asset) => asset.id !== action.payload
      );

      if (findPrevProjectAsset.length) {
        state.allProjectAssets = findPrevProjectAsset;
      } else {
        state.allProjectAssets = [];
      }
    },
    // Ends Project Assets Reducers

    // Project Cards Reducers
    fetchAllProjectCards: (state, action) => {
      state.allProjectCards = action.payload.data;
    },
    createUpdateProjectCard: (state, action) => {
      const findPrevProjectCard = state.allProjectCards?.findIndex(
        (card) => card.id === action.payload.id
      );

      if (findPrevProjectCard === -1) {
        state.allProjectCards = [
          { ...action.payload, tasks: [] },
          ...state.allProjectCards,
        ];
      } else {
        state.allProjectCards[findPrevProjectCard] = {
          ...action.payload,
          tasks: [],
        };
      }
    },
    deleteProjectCardReducer: (state, action) => {
      const findPrevProjectCard = state.allProjectCards?.filter(
        (card) => card.id !== action.payload
      );

      if (findPrevProjectCard.length) {
        state.allProjectCards = findPrevProjectCard;
      } else {
        state.allProjectCards = [];
      }
    },
    // Ends Project Cards Reducers
  },
});

export const {
  // Project Reducers
  fetchAllProjects,
  createUpdateProject,
  deleteProjectReducer,
  // Ends Project Reducers

  fetchAllProjectMembers,

  // Project Assets Reducers
  fetchAllProjectAssets,
  createUpdateProjectAsset,
  deleteProjectAssetReducer,
  // Ends Project Assets Reducers

  // Project Cards Reducers
  fetchAllProjectCards,
  createUpdateProjectCard,
  deleteProjectCardReducer,
  // Ends Project Cards Reducers
} = projectSlice.actions;

export default projectSlice.reducer;
