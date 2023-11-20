import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogged: false,
  },
  reducers: {
    loginHandler(state) {
      state.isLogged = !state.isLogged;
    },
  },
});

export const loginAction = loginSlice.actions;

export default loginSlice;
