import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { Post } from "./Main";
import accounts from "../data/accounts";

function Profile({
  allPosts,
  allCategories,
  currentUser
}) {
  let { username } = useParams();
  const [profUser, setProfUser] = useState({});
  const [profPosts, setProfPosts] = useState([]);
  

  const handleGetProfileData = () => {
    let tempUser = accounts.find((account) => account.username === username);
    let tempUserPosts = [];
    allCategories.map((category) => {
      category.posts.map((post) => {
        if(post.poster === username){
          tempUserPosts.push(post);
        }
      });

    });

    tempUserPosts.sort((a,b) => a.fulldate < b.fulldate ? 1:-1);
    setProfUser(tempUser);
    setProfPosts(tempUserPosts);
  };

  //USE EFFECT
  useEffect(()=>{
    handleGetProfileData();
  },[username]);

  return (
      <div className="Profile">
        <div className="profile-info">
          <img src="" className="profile-pic" alt="" />
          <h2>{profUser.username}</h2>
          {currentUser.username === username && <h3>Email: {profUser.email}</h3>}
          <h3>Post pts:&nbsp;{profUser.postPoints}</h3>
          <h3>Comment pts:{profUser.commentPoints}</h3>
        </div>
        <div className="profile-divider"></div>
        <h3>Posts</h3>
        <div className="profile-posts">
          {profPosts.map((post) => {
            return (
              <Post
                key={post.id}
                thisPost={post}
                allPosts={allPosts}
                
              />
            );
          })}
        </div>
      </div>
  );
}

export default Profile;
