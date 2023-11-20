import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PostItem from "./PostItem";
import EditButton from "./EditButton";
import Paginaition from "../Pagination/Pagination";

import classes from "./PostItemList.module.css";

const PostItemList = () => {
  const postList = useSelector((state) => state.post.posts);
  const isLoggedin = useSelector((state) => state.login.isLogged);
  const [currentPage, setCurrentPage] = useState(1);

  //페이지 넘버를 계산하기 위한 상수 설정 props로 pagination컴포넌트로 넘겨준다.
  const postsPerPage = 4;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // console.log(pageNum);
  return (
    <>
      <div className={classes.container}>
        <div style={{ width: "60%" }}>
          {currentPosts.map((post) => (
            <Link to={`${post.id}`} key={post.id}>
              <PostItem
                title={post.title}
                id={post.id}
                isLoggedin={isLoggedin}
              />
            </Link>
          ))}
        </div>
        {isLoggedin && <EditButton />}
      </div>
      <Paginaition
        postsPerPage={postsPerPage}
        totalPosts={postList.length}
        paginate={paginate}
      />
    </>
  );
};

export default PostItemList;
