import React, { useState, useEffect } from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import accounts from "../data/accounts";
import arrCategories from "../data/categories";

function PostFloater({ setShowMakePost }) {
  const handleMakePost = () => {
    setShowMakePost(true);
  };

  return (
    <div className="PostFloater">
      <button className="btn btn-post-floater" onClick={handleMakePost}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}

function Category({ id, name, members, image }) {
  return (
    <div className="Category" data-id={id}>
      <div className="category-info">
        <img className="category-img" src={image} alt="" />
        <div className="category-text-container">
          <Link to={`/hub/${name}`} className="link">
            <strong className="category-title">/{name}</strong>
          </Link>
          <span className="category-members">{members} members</span>
        </div>
      </div>
      <button className="btn btn-join">Join</button>
    </div>
  );
}

function Post({ thisPost, currentUser, setAllCategories, updateAllPosts, showDelete }) {
  //handlers
  const handleDeletePost = () => {
    //find category index
    let categoryIndex = arrCategories.findIndex(
      (category) => category.name === thisPost.category
    );
    //find post index
    let postIndex = arrCategories[categoryIndex].posts.findIndex(
      (post) => post.id === thisPost.id
    );
    //delete post
    arrCategories[categoryIndex].posts.splice(postIndex,1);
    //update posts
    updateAllPosts();
    //update database state
    setAllCategories(arrCategories);
  };

  const confirmDeletePost = () => {
    if(window.confirm("Delete this post?")) handleDeletePost();
  }

  return (
    <div className="Post" data-id={thisPost.id}>
      <div className="container votes-container">
        <button className="btn btn-vote btn-upvote">
          <i className="fas fa-chevron-up"></i>
        </button>
        <p className="votes">{thisPost.votes}</p>
        <button className="btn btn-vote btn-downvote">
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
      <div className="container post-content-container">
        <div className="post-header">
          <Link to={`/hub/${thisPost.category}`} className="link">
            <strong className="post-group">/{thisPost.category}</strong>
          </Link>

          <p className="post-postedBy">
            posted by{" "}
            <Link to={`/profile/${thisPost.poster}`} className="link">
              <span className="post-user">{thisPost.poster}</span>
            </Link>
          </p>

          <p className="post-time">
            {thisPost.date}
            <span style={{ marginLeft: 8, color: "#1d1d1d80" }}>
              {thisPost.time}
            </span>
          </p>
          {!showDelete ? "" : 
          !currentUser ? "" : currentUser.username === thisPost.poster && (
            <button className="btn btn-delete-post" onClick={confirmDeletePost}>
              <i className="fas fa-times"></i>
            </button>
          ) 
          }
          
        </div>
        <div className="post-main">
          <Link to={`/post/${thisPost.id}`} className="link">
            <h3 className="post-title">{thisPost.title}</h3>
          </Link>
          <p className="post-message">{thisPost.text}</p>
          <div className="post-img-container">
            <img className="post-img" src={thisPost.image} alt="" />
          </div>
          <div className="post-comment-container">
            <div className="post-comment">
              <i
                className="fas fa-comment-alt"
                style={{ fontSize: "12px" }}
              ></i>
              <Link to={`/post/${thisPost.id}`} className="link">
                <span className="post-comment-text">{`${
                  thisPost.comments ? thisPost.comments.length : ""
                } Comments`}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Main({
  allCategories,
  allPosts,
  isLoggedIn,
  setShowMakePost,
  setShowNewHub,
  categoryName,
  categoryPosts,
  setCategoryPosts,
  currentUser,
  setAllCategories,
  updateAllPosts,
}) {
  const handleNewHub = () => {
    setShowNewHub(true);
  };

  //USE EFFECT
  useEffect(() => {
    //get posts from same category only or all posts if no category name
    if (categoryName) {
      let categoryIndex = allCategories.findIndex(
        (category) => category.name === categoryName
      );
      setCategoryPosts(allCategories[categoryIndex].posts);
    } else {
      setCategoryPosts(allPosts);
    }
  }, [allCategories, categoryName]);

  return (
    <div className="Main container">
      <div className="current-category">
        <h1>{categoryName ? `/${categoryName}` : "/All"}</h1>
      </div>
      <div className="posts-container container">
        {categoryPosts.map((post) => {
          return (
            <Post
              key={post.id}
              thisPost={post}
              currentUser={currentUser}
              setAllCategories={setAllCategories}
              updateAllPosts={updateAllPosts}
            />
          );
        })}
      </div>
      <div className="categories-container container">
        <p className="category-header">Categories</p>
        {allCategories.map((category) => {
          return (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
              members={category.members}
              image={category.image}
            />
          );
        })}
        {isLoggedIn && (
          <button className="btn btn-new-category" onClick={handleNewHub}>
            Add Category
          </button>
        )}
      </div>
      {isLoggedIn && <PostFloater setShowMakePost={setShowMakePost} />}
    </div>
  );
}

export default Main;
export { Post, PostFloater };
