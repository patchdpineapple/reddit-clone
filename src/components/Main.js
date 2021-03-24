import React from "react";
import "./Main.css";
import waldo from "../images/waldo_beach.jpg";


function Category () {
  return (
    <div className="Category">
            <div className="category-info">
              <img className="category-img" src={waldo} alt="category" />
              <div className="category-text-container">
                 <strong className="category-title">/Gaming</strong>
                  <span className="category-members">1 member</span>
              </div>
              
            </div>
            <button className="btn btn-join">Join</button>
          </div>
  );
}

function Post() {
    return (
        <div className="Post">
        <div className="container votes-container">
          <button className="btn btn-vote btn-upvote"><i className="fas fa-chevron-up"></i></button>
          <p className="votes">0</p>
          <button className="btn btn-vote btn-downvote"><i className="fas fa-chevron-down"></i></button>
        </div>
        <div className="container post-content-container">
          <div className="post-header">
            <strong className="post-group">/Gaming</strong>
            <p className="post-user">posted by <span>Rimuru</span></p>
            <p className="post-time">3 hours ago</p>
          </div>
          <div className="post-main">
            <h2 className="post-title">Find Waldo Beach Level</h2>
            <p className="post-message">Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Ducimus, possimus tenetur! Blanditiis distinctio ad expedita similique, mollitia quas, 
              aperiam officiis vitae vel harum impedit quisquam eveniet sint eius nulla deserunt.</p>
              <div className="post-img-container">
               <img className="post-img" src={waldo} alt="waldo beach" />
              </div>
            <div className="post-comment-container">
              <div className="post-comment">
                <i className="fas fa-comment-alt" style={{"font-size": "12px"}}></i><span className="post-comment-text">0 Comments</span>
              </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

function Main() {
  return (
  <div className="Main container">
      <div className="current-category">
          <h1>/All</h1>
        </div>
        <div className="posts-container container">
            <Post />
        </div>
        <div className="categories-container container">
            <p className="category-header">Categories</p>
            <Category />
        </div>
  </div>
  );
}

export default Main;
