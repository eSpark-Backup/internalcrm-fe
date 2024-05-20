import { createSlice } from "@reduxjs/toolkit";

const leadSourcesSlice = createSlice({
  name: "leadSources",
  initialState: {
    allLeadSources: [],
  },
  reducers: {
    fetchAllSources: (state, action) => {
      state.allLeadSources = action.payload.data;
    },

    createUpdateSource: (state, action) => {
      const findPrevLeadSource = state.allLeadSources?.findIndex(
        (source) => source.id === action.payload.id
      );

      if (findPrevLeadSource === -1) {
        state.allLeadSources = [...state.allLeadSources, { ...action.payload }];
      } else {
        state.allLeadSources[findPrevLeadSource] = action.payload;
      }
    },

    deleteSource: (state, action) => {
      const findPrevLeadSource = state.allLeadSources?.filter(
        (source) => source.id !== action.payload
      );

      if (findPrevLeadSource.length) {
        state.allLeadSources = findPrevLeadSource;
      } else {
        state.allLeadSources = [];
      }
    },
  },
});

export const { fetchAllSources, createUpdateSource, deleteSource } =
  leadSourcesSlice.actions;

export default leadSourcesSlice.reducer;
