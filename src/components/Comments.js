import React from "react";
import "./Comments.css";
import { useParams } from "react-router-dom";
import { Post } from "./Main";

function Comments({
  post,
  allPosts,
  setCurrentPost,
}) {
  return (
    <div className="Comments">
      <h1>Comments</h1>
      <div className="profile-posts">
        <Post
          key={post.id}
          thisPost={post}
          allPosts={allPosts}
          setCurrentPost={setCurrentPost}
        />
      </div>
      <div className="comments-divider"></div>
    </div>
  );
}

export default Comments;
