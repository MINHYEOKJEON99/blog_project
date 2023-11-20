import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./post-slice";
import commentSlice from "./comment-slice";
import loginSlice from "./login-slice";

const store = configureStore({
  reducer: {
    post: postSlice.reducer,
    comment: commentSlice.reducer,
    login: loginSlice.reducer,
  },
});

export default store;
