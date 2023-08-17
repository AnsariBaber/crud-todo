/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDbData: null,
  isLoggedIn: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserDbData: (state, { payload }) => {
      state.userDbData = payload;
    },
    setIsLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
  },
});

export const { setUserDbData, setIsLoggedIn } = globalSlice.actions;

export const selectCurrentUser = (state) => state.global.user;
