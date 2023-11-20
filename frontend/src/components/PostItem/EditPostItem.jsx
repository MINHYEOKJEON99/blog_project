import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./EditPostItem.module.css";

import { postAction } from "../../store/post-slice";

const EditPostItem = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const dispatch = useDispatch();

  //제목과 포스팅 내용 핸들러
  const titleChangeHandler = (e) => {
    setNewTitle(e.target.value);
  };
  const desChangeHandler = (e) => {
    setNewDescription(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    //간단한 유효성 검사
    if (newTitle.trim().length === 0 || newTitle.trim().length === 0) {
      alert("칸을 채워주세요");
      return;
    }

    dispatch(
      postAction.addData({
        id: Math.random().toFixed(6),
        title: newTitle,
        description: newDescription,
      })
    );
    setNewDescription("");
    setNewTitle("");
    alert("글이 추가되었습니다");
  };

  return (
    <div className={classes.story_form_container}>
      <form onSubmit={submitHandler}>
        <label className={classes.label} htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={classes.textInput}
          required
          value={newTitle}
          onChange={titleChangeHandler}
        />

        <label className={classes.label} htmlFor="story">
          POST DESCRIPTION:
        </label>
        <textarea
          className={classes.textarea}
          id="story"
          name="story"
          rows="6"
          required
          value={newDescription}
          onChange={desChangeHandler}
        ></textarea>

        <input className={classes.submitBtn} type="submit" value="ADD POST" />
      </form>
    </div>
  );
};
export default EditPostItem;
