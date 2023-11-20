import { useState } from "react";
import { useDispatch } from "react-redux";

import { commentAction } from "../../store/comment-slice";

import classes from "./EditComponent.module.css";

const EditComment = (props) => {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  //댓글칸 데이터 저장
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const commentChangeHandler = (event) => {
    setComment(event.target.value);
  };

  //댓글 버튼 조건부 렌더링
  const buttonInvisibleHandler = () => {
    setButtonVisible(false);
  };
  const buttonVisibleHandler = () => {
    setButtonVisible(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      commentAction.commentAdd({
        id: props.id,
        commentid: Math.random().toFixed(6),
        username: username,
        comment: comment,
      })
    );

    setButtonVisible(true);
    setUsername("");
    setComment("");
  };

  return (
    <>
      {buttonVisible && (
        <button className={classes.btn} onClick={buttonInvisibleHandler}>
          댓글 작성
        </button>
      )}
      {!buttonVisible && (
        <div className={classes.story_form_container}>
          <form onSubmit={submitHandler}>
            <label className={classes.label} htmlFor="username">
              이름:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={classes.textInput}
              required
              value={username}
              onChange={usernameChangeHandler}
            />

            <label className={classes.label} htmlFor="comment">
              댓글:
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="6"
              required
              className={classes.textarea}
              value={comment}
              onChange={commentChangeHandler}
            ></textarea>

            <input
              className={classes.submit_btn}
              type="submit"
              value="댓글 작성하기"
            />
            <input
              style={{ marginLeft: "5px" }}
              className={classes.btn}
              onClick={buttonVisibleHandler}
              type="button"
              value="닫기"
            />
          </form>
        </div>
      )}
    </>
  );
};
export default EditComment;
