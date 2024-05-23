import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    allProjects: [],
    allProjectMembers: [],
    allProjectAssets: [],
    allProjectCards: [],
    allProjectTasks: [],
    allProjectTaskComments: [],
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
      const cardIndex = state.allProjectCards?.findIndex(
        (card) => card.id === action.payload?.cardId?.id
      );

      const findPrevProjectCard = state.allProjectCards?.find(
        (card) => card.id === action.payload?.cardId?.id
      );
      const findPrevTask = findPrevProjectCard?.tasks?.findIndex(
        (task) => task.id === action.payload?.id
      );

      if (findPrevTask === -1) {
        state.allProjectCards[cardIndex].tasks.push(action.payload);
      } else {
        state.allProjectCards[cardIndex].tasks[findPrevTask] = action.payload;
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

    // Project Tasks Reducers
    fetchAllProjectTasks: (state, action) => {
      state.allProjectTasks = action.payload.data;
    },

    createUpdateProjectTask: (state, action) => {
      state.allProjectCards = state.allProjectCards.map((card) => {
        if (card.id === action.payload.cardId?.id) {
          const existingTaskIndex = card.tasks.findIndex(
            (task) => task.id === action.payload.id
          );
          if (existingTaskIndex === -1) {
            // Task doesn't exist, add it
            return {
              ...card,
              tasks: [...card.tasks, action.payload],
            };
          } else {
            // Task exists, update it
            return {
              ...card,
              tasks: card.tasks.map((task, index) =>
                index === existingTaskIndex ? action.payload : task
              ),
            };
          }
        }
        return card;
      });
    },

    deleteProjectTaskReducer: (state, action) => {
      const findPrevProjectTask = state.allProjectTasks?.filter(
        (asset) => asset.id !== action.payload
      );

      if (findPrevProjectTask.length) {
        state.allProjectTasks = findPrevProjectTask;
      } else {
        state.allProjectTasks = [];
      }
    },
    // Ends Project Tasks Reducers

    // Project Task Comments Reducers
    fetchAllProjectTaskComments: (state, action) => {
      state.allProjectTaskComments = action.payload.data;
    },

    // Ends Project Task Comments Reducers
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

  // Project Tasks Reducers
  fetchAllProjectTasks,
  createUpdateProjectTask,
  deleteProjectTaskReducer,
  // Ends Project Tasks Reducers

  // Project Task Comments Reducers
  allProjectTaskComments,
  // Ends Project Task Comments Reducers
} = projectSlice.actions;

export default projectSlice.reducer;
