import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import EditComment from "../Comment/EditComment";
import Comment from "../Comment/Comment";

import classes from "./PostContent.module.css";

const PostContent = () => {
  const params = useParams();
  const posts = useSelector((state) => state.post.posts);
  const comments = useSelector((state) => state.comment.comments);

  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState(null);
  const [commentContent, setCommentContent] = useState(null);

  //포스트와 코멘트가 바뀔때 마다 불러오는 함수
  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = posts.find((post) => post.id.toString() === params.postId);
        const comment = comments.filter(
          (comment) => comment.id.toString() === params.postId
        );
        setPostContent(post);
        setCommentContent(comment);
      } catch (error) {
        console.log("로드실패", error);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [params.postId, posts, comments]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!postContent) {
    return (
      <div className={classes.container} style={{ textAlign: "center" }}>
        <h3>삭제되거나 존재하지 않는 게시물입니다.</h3>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>{postContent.title}</h1>
      </div>
      <div className={classes.description}>
        <p>{postContent.description}</p>
      </div>
      <EditComment id={postContent.id} />
      <div className={classes.comment_box}>
        {commentContent.map((data) => (
          <Comment
            key={data.commentid}
            commentid={data.commentid}
            username={data.username}
            comment={data.comment}
          />
        ))}
      </div>
    </div>
  );
};
export default PostContent;
