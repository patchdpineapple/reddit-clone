import React, { useState, useEffect } from "react";
import "./Profile.css";
import guest from "../data/guest";
import {Post} from "./Main";

function Profile({allPosts}) {
  const [guestData, setGuestData] = useState(guest);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    let tempUserPosts = allPosts.filter((post) => {
      let idChecker = false;
      guestData.postsIds.map( id => {
        if(id===post.id) idChecker = true;
        return id;
      });
      return idChecker;

    });

    setUserPosts(tempUserPosts);
    
  }, []);

  return (
    <div className="Profile">
      <div className="profile-info">
        <img src="" className="profile-pic" alt="" />
        <h2>{guestData.name}</h2>
        <h3>Post pts:{guestData.postPoints}</h3>
        <h3>Comment pts:{guestData.commentPoints}</h3>
      </div>
      <div className="profile-divider"></div>
      <h3>Posts</h3>
      <div className="profile-posts">
        {userPosts.map((post) => {
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
    </div>
  );
}

export default Profile;
