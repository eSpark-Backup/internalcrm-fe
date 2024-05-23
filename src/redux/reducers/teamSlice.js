import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    allTeams: [],
  },
  reducers: {
    // Team Reducers
    fetchAllTeams: (state, action) => {
      state.allTeams = action.payload.data;
    },

    createUpdateTeam: (state, action) => {
      const findPrevTeam = state.allTeams?.findIndex(
        (team) => team.id === action.payload.id
      );

      if (findPrevTeam === -1) {
        state.allTeams = [...state.allTeams, { ...action.payload }];
      } else {
        state.allTeams[findPrevTeam] = action.payload;
      }
    },

    deleteTeamReducer: (state, action) => {
      const findPrevTeam = state.allTeams?.filter(
        (team) => team.id !== action.payload
      );

      if (findPrevTeam.length) {
        state.allTeams = findPrevTeam;
      } else {
        state.allTeams = [];
      }
    },
    // Ends Team Reducers
  },
});

export const { fetchAllTeams, createUpdateTeam, deleteTeamReducer } =
  teamSlice.actions;

export default teamSlice.reducer;
