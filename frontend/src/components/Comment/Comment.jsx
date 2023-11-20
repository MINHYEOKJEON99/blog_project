import { useDispatch } from "react-redux";
import { commentAction } from "../../store/comment-slice";

import classes from "./Comment.module.css";

const Comment = (props) => {
  const dispatch = useDispatch();

  const removeCommentHandler = () => {
    dispatch(commentAction.removeComment(props.commentid));
  };

  return (
    <>
      <div className={classes.comment_box}>
        <h5 className={classes.name}>이름: {props.username}</h5>
        <p className={classes.comment}>{props.comment}</p>
      </div>
      <button className={classes.delete} onClick={removeCommentHandler}>
        삭제
      </button>
    </>
  );
};
export default Comment;
