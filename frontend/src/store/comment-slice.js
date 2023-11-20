import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    commentDeleteId: null,
  },
  reducers: {
    replaceData(state, action) {
      state.comments = action.payload.comments;
    },
    commentAdd(state, action) {
      const newData = action.payload;

      state.comments.push({
        id: newData.id,
        commentid: newData.commentid.toString(),
        username: newData.username,
        comment: newData.comment,
      });
    },
    removeComment(state, action) {
      state.commentDeleteId = action.payload;
      state.comments = state.comments.filter(
        (data) => data.commentid !== action.payload
      );
    },
    initDeleteCommentId(state) {
      state.commentDeleteId = null;
    },
  },
});

export const commentAction = commentSlice.actions;

export default commentSlice;
