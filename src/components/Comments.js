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

function Comments({ allPosts, setCurrentPost, isLoggedIn, setAllCategories }) {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [thisPost, setThisPost] = useState({});
  const [allComments, setAllComments] = useState([]);
  

  const handleSubmit = (e) => {
    //add comment to database

    e.preventDefault();
    if(comment === "") return;

    //find index of category where post belongs
    let categoryIndex = arrCategories.findIndex((category) => category.name === thisPost.category);
    //find index of post from the same category
    let postIndex = arrCategories[categoryIndex].posts.findIndex((post) => post.id === thisPost.id)
    //generate id of comment
    let commentId = Math.floor(Math.random() * 10000);
    //record comment
    let newComment = {
      id: commentId,
      user: thisPost.poster,
      text: comment
    }
    //add the comment using both indices
    arrCategories[categoryIndex].posts[postIndex].comments.push(newComment);
    //update database state 
    setAllCategories(arrCategories);

    setComment("");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  //USE EFFECT
  const getPostAndCommentsData = () => {
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
    tempPost.comments.reverse();
    setAllComments(tempPost.comments);

  };

  useEffect(()=>{
    getPostAndCommentsData();
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
