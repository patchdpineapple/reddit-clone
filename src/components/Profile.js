import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Post } from "./Main";

function Profile({ allPosts, currentUser, setCurrentUser, userPosts, setUserPosts, setCurrentPost  }) {


  // useEffect(() => {
  //   //set user data/info on render
  //   let tempUserPosts = allPosts.filter((post) => {
  //     let idChecker = false;
  //     //check if post id is the same to user post id
  //     currentUser.postsIds.map((id) => {
  //       if (id === post.id) idChecker = true;
  //       return id;
  //     });
  //     return idChecker;
  //   });

  //   setUserPosts(tempUserPosts);
  // }, []);

  return (
    <div className="Profile">{console.log("render")}
      <div className="profile-info">
        <img src="" className="profile-pic" alt="" />
        <h2>{currentUser.username}</h2>
        <h3>Post pts:&nbsp;{currentUser.postPoints}</h3>
        <h3>Comment pts:{currentUser.commentPoints}</h3>
      </div>
      <div className="profile-divider"></div>
      <h3>Posts</h3>
      <div className="profile-posts">
        {userPosts.map((post) => {
          return (
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
              allPosts={allPosts}
              setCurrentPost={setCurrentPost}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
