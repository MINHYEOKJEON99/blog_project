import { commentAction } from "./comment-slice";
import { postAction } from "./post-slice";

//post데이터를 받아오는 함수
export const fetchPostData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/posts");

      if (!response.ok) {
        throw new Error("데이터 가져오기 실패");
      }

      const data = response.json();

      return data;
    };
    try {
      const postData = await fetchData();

      dispatch(
        postAction.replaceData({
          posts: postData || [],
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//comment데이터를 받아오는함수
export const fetchCommentData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/comments");

      if (!response.ok) {
        throw new Error("데이터 가져오기 실패");
      }

      const data = response.json();

      return data;
    };
    try {
      const commentData = await fetchData();

      dispatch(
        commentAction.replaceData({
          comments: commentData || [],
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

//포스트 데이터를 작성했을때 서버로 보내는 함수
export const sendPostData = (posts) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8080/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(posts),
      });
      if (!response.ok) {
        throw new Error("데이터 보내기 실패");
      }
    };
    try {
      sendRequest();
    } catch (error) {
      throw new Error("보내기 실패");
    }
  };
};

//포스트를 삭제했을때 보내는 함수
export const deletePostData = (postId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:8080/posts/${Number(postId)}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("데이터 보내기 실패");
      }
    };
    try {
      await sendRequest();
    } catch (error) {
      throw new Error("보내기 실패");
    }
  };
};

//댓글을 추가했을때 데이터 등록하는 함수
export const sendCommentData = (comments) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:8080/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comments),
      });
      if (!response.ok) {
        throw new Error("데이터 보내기 실패");
      }
    };
    try {
      sendRequest();
    } catch (error) {
      throw new Error("보내기 실패");
    }
  };
};

//코멘트를 삭제했을때 삭제요청을 보내는함수
export const deleteCommentData = (commentId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:8080/comments/${Number(commentId)}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("데이터 보내기 실패");
      }
    };
    try {
      sendRequest();
    } catch (error) {
      throw new Error("보내기 실패");
    }
  };
};
