import React, { useState, useEffect } from "react";
import "./Comments.css";
import { useParams } from "react-router-dom";
import { Post } from "./Main";
import arrCategories from "../data/categories";


function Comment({ user, text }) {
  return (
    <div className="Comment">
      <span>{user}</span>
      <p>{text}</p>
    </div>
  );
}

function Comments({ allPosts, setCurrentPost, isLoggedIn }) {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [thisPost, setThisPost] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [allCurrentPosts, setAllCurrentPosts] = useState([]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(comment);
    setComment("");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleGetPostAndCommentsData = () => {
    
    //get all posts
    let tempPosts = [];
    arrCategories.map((category) => {
      category.posts.map((post) => {
        tempPosts.push(post);
        return post;
      });
      return category;
    });

    //find specific post
    let tempPost = tempPosts.find((post) => {
      return post.id === id;
    });
    setThisPost(tempPost);
    setAllComments(tempPost.comments);

  };

  useEffect(()=>{
    handleGetPostAndCommentsData();
  },[id]);

  return (
    <div className="Comments">
      <div className="posts-container">
        <Post
          key={thisPost.id}
          thisPost={thisPost}
          allPosts={allPosts}
          setCurrentPost={setCurrentPost}
        /> 
        {isLoggedIn && (
          <form
            className="comments-form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => handleSubmit(e)}
          >
            <textarea
              id="comments-textarea"
              placeholder="What are your thoughts?"
              onChange={(e) => handleCommentChange(e)}
              value={comment}
            ></textarea>
            <button type="submit" className="btn btn-comment">
              Post comment
            </button>
          </form>
        )}
        <div className="comments-divider"></div>
        <h2>Comments</h2>
        <div className="comments-container">
          {allComments.map((comment) => {
            return (
              <Comment key={comment.id} user={comment.user} text={comment.text} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Comments;
