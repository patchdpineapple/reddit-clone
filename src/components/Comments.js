import React from "react";
import "./Comments.css";
import { useParams } from "react-router-dom";
import { Post } from "./Main";

function Comments({ post }) {
  return (
    <div className="Comments">
      <h1>Comments</h1>
      <div className="profile-posts">
        <Post
          key={post.id}
          id={post.id}
          category={post.category}
          poster={post.poster}
          date={post.date}
          title={post.title}
          text={post.text}
          image={post.image}
          votes={post.votes}
          comments={post.comments}
        />
      </div>
      <div className="comments-divider"></div>
    </div>
  );
}

export default Comments;
