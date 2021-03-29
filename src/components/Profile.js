import React, { useEffect } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { Post } from "./Main";
import accounts from "../data/accounts";

function Profile({
  allPosts,
  setCurrentPost,
  profileUser,
  profilePosts,
  setProfileUser,
  setProfilePosts
}) {
  let { username } = useParams();
  console.log(username);

  return (
    <div className="Profile">
      <div className="profile-info">
        <img src="" className="profile-pic" alt="" />
        <h2>{profileUser.username}</h2>
        <h3>Post pts:&nbsp;{profileUser.postPoints}</h3>
        <h3>Comment pts:{profileUser.commentPoints}</h3>
      </div>
      <div className="profile-divider"></div>
      <h3>Posts</h3>
      <div className="profile-posts">
        {profilePosts.map((post) => {
          return (
            <Post
              key={post.id}
              thisPost={post}
              allPosts={allPosts}
              setCurrentPost={setCurrentPost}
              setProfileUser={setProfileUser}
              setProfilePosts={setProfilePosts}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
