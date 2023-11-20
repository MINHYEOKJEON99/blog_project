import React from "react";
import { useDispatch } from "react-redux";
import { postAction } from "../../store/post-slice";

import classes from "./PostItem.module.css";

const PostItem = (props) => {
  const dispatch = useDispatch();

  const removeHandler = () => {
    dispatch(postAction.removeData(props.id));
    alert("삭제되었습니다.");
  };
  return (
    <div className={classes.post}>
      <p className={classes.item}>{props.title}</p>
      {props.isLoggedin && (
        <button onClick={removeHandler} className={classes.btn}>
          X
        </button>
      )}
    </div>
  );
};
export default PostItem;
