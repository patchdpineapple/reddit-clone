import React from "react";
import "./Main.css";
import { Link } from "react-router-dom";

function PostFloater({setShowMakePost}) {
  const handleMakePost = () => {
    setShowMakePost(true);
  }

  return (
    <div className="PostFloater">
      <button className="btn btn-post-floater" onClick={handleMakePost}><i className="fas fa-plus"></i></button>
      </div>
  );
}

function Category({ id, name, members, image }) {
  return (
    <div className="Category" data-id={id}>
      <div className="category-info">
        <img className="category-img" src={image} alt="" />
        <div className="category-text-container">
          <Link to={`hub/${name}`} className="link"><strong className="category-title">/{name}</strong></Link>
          <span className="category-members">{members} members</span>
        </div>
      </div>
      <button className="btn btn-join">Join</button>
    </div>
  );
}

function Post({ category, poster, date, title, text, image, votes, comments }) {
  return (
    <div className="Post">
      <div className="container votes-container">
        <button className="btn btn-vote btn-upvote">
          <i className="fas fa-chevron-up"></i>
        </button>
        <p className="votes">{votes}</p>
        <button className="btn btn-vote btn-downvote">
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
      <div className="container post-content-container">
        <div className="post-header">
          <strong className="post-group">/{category}</strong>
          <p className="post-user">posted by {poster}</p>
          <p className="post-time">{date}</p>
        </div>
        <div className="post-main">
          <h3 className="post-title">{title}</h3>
          <p className="post-message">{text}</p>
          <div className="post-img-container">
            <img className="post-img" src={image} alt="" />
          </div>
          <div className="post-comment-container">
            <div className="post-comment">
              <i
                className="fas fa-comment-alt"
                style={{ "fontSize": "12px" }}
              ></i>
              <span className="post-comment-text">{comments} Comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Main({allCategories, allPosts, isLoggedIn, setShowMakePost}) {
  

  return (
    <div className="Main container">
      <div className="current-category">
        <h1>/All</h1>
      </div>
      <div className="posts-container container">
        {allPosts.map((post) => {
          return (
            <Post
              key={post.id}
              category={post.category}
              poster={post.poster}
              date={post.date}
              title={post.title}
              text={post.text}
              image={post.image}
              votes={post.votes}
              comments={post.comments}
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
      </div>
      {isLoggedIn && <PostFloater setShowMakePost={setShowMakePost} />}
    </div>
  );
}

export default Main;
export {Post};