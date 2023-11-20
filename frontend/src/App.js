import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  deleteCommentData,
  deletePostData,
  fetchCommentData,
  fetchPostData,
  sendCommentData,
  sendPostData,
} from "./store/data-actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/About";
import Search from "./pages/Search";
import EditPostItem from "./components/PostItem/EditPostItem";
import PostContentPage from "./pages/PostContentPage";
import LoginPage from "./pages/LoginPage";
import { commentAction } from "./store/comment-slice";
import { postAction } from "./store/post-slice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/search", element: <Search /> },
      { path: "/:postId", element: <PostContentPage /> },
      { path: "/edit", element: <EditPostItem /> },
    ],
  },
]);

let isInitial = true;

function App() {
  const postDeleteId = useSelector((state) => state.post.postDeleteId);
  const commentDeleteId = useSelector((state) => state.comment.commentDeleteId);
  const posts = useSelector((state) => state.post.posts);
  const comments = useSelector((state) => state.comment.comments);
  const dispatch = useDispatch();

  //포스트데이터와 댓글데이터를 처음에 부르는함수
  useEffect(() => {
    dispatch(fetchPostData());
    dispatch(fetchCommentData());
  }, [dispatch]);

  useEffect(() => {
    //처음 렌더링할때 밑에 로직들이 실행하지 않게 하기위한 변수
    if (isInitial) {
      isInitial = false;
      return;
    }

    //redux state에 저장된 posts데이터가 바뀌면 추가,삭제를 하는 로직
    if (posts) {
      dispatch(sendPostData(posts));
      if (postDeleteId) {
        dispatch(deletePostData(postDeleteId));
        dispatch(postAction.initDeleteId);
      }
    }

    //redux state에 저장된 comment데이터가 바뀌면 추가,삭제를 하는 로직
    if (comments) {
      dispatch(sendCommentData(comments));
      if (commentDeleteId) {
        dispatch(deleteCommentData(commentDeleteId));
        dispatch(commentAction.initDeleteCommentId);
      }
      console.log(comments);
    }
  }, [posts, comments, postDeleteId, commentDeleteId, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
