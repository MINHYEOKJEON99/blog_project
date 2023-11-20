import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./SearchBar.module.css";

import PostItem from "../PostItem/PostItem";

const SearchMenu = () => {
  const isLoggedIn = useSelector((state) => state.login.isLogged);
  const [searchValue, setSearchValue] = useState("");
  const [searchPost, setSearchPost] = useState([]);

  const posts = useSelector((state) => state.post.posts);

  const searchChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSearchPost(posts.filter((post) => post.title.includes(searchValue)));
    console.log("h");
  };

  return (
    <div className={classes.story_form_container}>
      <form onSubmit={submitHandler}>
        <label className={classes.label} htmlFor="title">
          Title search:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={classes.textInput}
          value={searchValue}
          onChange={searchChangeHandler}
          required
        />
        <input className={classes.submitBtn} type="submit" value="Search" />
      </form>
      {searchPost.map((post) => {
        return (
          <Link to={`/${post.id}`} key={post.id}>
            <PostItem isLoggedin={isLoggedIn} title={post.title} id={post.id} />
          </Link>
        );
      })}
    </div>
  );
};

export default SearchMenu;
