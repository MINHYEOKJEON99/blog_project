import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postDeleteId: null,
  },
  reducers: {
    replaceData(state, action) {
      state.posts = action.payload.posts;
    },
    addData(state, action) {
      const newData = action.payload;

      state.posts.push({
        id: newData.id.toString(),
        title: newData.title,
        description: newData.description,
      });
    },
    removeData(state, action) {
      state.postDeleteId = action.payload;
      state.posts = state.posts.filter((data) => {
        return data.id !== action.payload;
      });
    },
    initDeleteId(state) {
      state.postDeleteId = null;
    },
  },
});

export const postAction = postSlice.actions;

export default postSlice;
