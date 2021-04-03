import React, { useState, useEffect } from "react";
import "./Comments.css";
import { Link, useParams } from "react-router-dom";
import { Post } from "./Main";
import arrCategories from "../data/categories";

function Comment({
  id,
  user,
  text,
  thisPost,
  currentUser,
  setAllCategories,
  updateAllPosts,
}) {
  //states
  const [showEdit, setShowEdit] = useState(false);
  const [newComment, setNewComment] = useState(text);

  //functions
  const getCommentIndexes = () => {
    //returns indexes for finding this comment from the database
    //find index of category where post belongs
    let categoryIndex = arrCategories.findIndex(
      (category) => category.name === thisPost.category
    );
    //find index of post from the same category
    let postIndex = arrCategories[categoryIndex].posts.findIndex(
      (post) => post.id === thisPost.id
    );
    //find index of comment
    let commentIndex = arrCategories[categoryIndex].posts[
      postIndex
    ].comments.findIndex((comment) => comment.id === id);

    return {
      categoryIndex: categoryIndex,
      postIndex: postIndex,
      commentIndex: commentIndex,
    };
  };

  //handlers
  
  const handleDeleteComment = () => {
    
    let indexes = getCommentIndexes();
    //delete comment from database
    arrCategories[indexes.categoryIndex].posts[
      indexes.postIndex
    ].comments.splice(indexes.commentIndex, 1);
    //update posts
    updateAllPosts();
    //update database state
    setAllCategories(arrCategories);

  };

  const confirmDeleteComment = () => {
    if(window.confirm("Delete this comment?")) handleDeleteComment();
  }

  const handleEditChange = (e) => {
    setNewComment(e.target.value);
  };

  const toggleShowEdit = () => {
    setShowEdit(!showEdit);
  }

  const handleSubmitEdit =(e)=>{
    e.preventDefault();
    if(newComment === "") return;
    let indexes = getCommentIndexes();
    //edit comment from database
    arrCategories[indexes.categoryIndex].posts[
      indexes.postIndex
    ].comments[indexes.commentIndex].text = newComment;
    //update posts
    updateAllPosts();
    //update database state
    setAllCategories(arrCategories);
  }

  return (
    <div className="Comment">
      <Link to={`/profile/${user}`} className="link">
        <span>{user}</span>
      </Link>

      <div className="text-container">
        <p className="comment-text">{text}</p>
        <div className="btn-container">
          {currentUser.username === user && (
            <button className="btn btn-show-edit" onClick={toggleShowEdit}>
              <i className="fas fa-edit"></i>
            </button>
          )}
          {currentUser.username === user && (
            <button className="btn btn-delete" onClick={confirmDeleteComment}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
      {
        showEdit && (
          <div className="edit-container">
            <form 
            className="comments-form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => handleSubmitEdit(e)}>
            <textarea
              id="comment-edit-textarea"
              placeholder="Edit message"
              onChange={(e) => handleEditChange(e)}
              value={newComment}
            ></textarea>
            <button type="submit" className="btn btn-edit">
              Confirm edit
            </button>
            </form>

          </div>
        )
      }
      
    </div>
  );
}

function Comments({
  allPosts,
  isLoggedIn,
  setAllCategories,
  currentUser,
  updateAllPosts,
}) {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [thisPost, setThisPost] = useState({});
  const [allComments, setAllComments] = useState([]);

  const handleSubmit = (e) => {
    //add comment to database

    e.preventDefault();
    if (comment === "") return;

    //find index of category where post belongs
    let categoryIndex = arrCategories.findIndex(
      (category) => category.name === thisPost.category
    );
    //find index of post from the same category
    let postIndex = arrCategories[categoryIndex].posts.findIndex(
      (post) => post.id === thisPost.id
    );
    //generate id of comment
    let commentId = Math.floor(Math.random() * 10000);
    //record comment
    let newComment = {
      id: commentId,
      user: currentUser.username,
      text: comment,
    };
    //add the comment using both indices
    arrCategories[categoryIndex].posts[postIndex].comments.unshift(newComment);
    //update database state
    setAllCategories(arrCategories);

    setComment("");
  };

  const handleCommentChange = (e) => {
    //update input state
    setComment(e.target.value);
  };

  //USE EFFECT
  const getPostAndCommentsData = () => {
    //find the post and its comments from the database and set as state
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

  useEffect(() => {
    getPostAndCommentsData();
  }, [id]);

  return (
    <div className="Comments">
      <div className="posts-container">
        <Post
          key={thisPost.id}
          thisPost={thisPost}
          currentUser={currentUser}
          setAllCategories={setAllCategories}
          updateAllPosts={updateAllPosts}
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
              <Comment
                key={comment.id}
                id={comment.id}
                user={comment.user}
                text={comment.text}
                thisPost={thisPost}
                currentUser={currentUser}
                setAllCategories={setAllCategories}
                updateAllPosts={updateAllPosts}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Comments;
