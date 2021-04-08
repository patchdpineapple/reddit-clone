import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { Post } from "./Main";
import accounts from "../data/accounts";
import { auth, db } from "../firebase/config";

function Profile({
  allCategories,
  currentUser,
  setAllCategories,
  updateAllPosts,
  isLoggedIn,
  setShowLogin,
}) {
  let { username } = useParams();
  const [profUser, setProfUser] = useState(null);
  const [profPosts, setProfPosts] = useState([]);
  const [profPoints, setProfPoints] = useState([]);

  //USE EFFECT

  // const handleGetProfileData = () => {
  //   let tempUser = accounts.find((account) => account.username === username);
  //   let tempUserPosts = [];
  //   allCategories.map((category) => {
  //     category.posts.map((post) => {
  //       if (post.poster === username) {
  //         tempUserPosts.push(post);
  //       }
  //       return post;
  //     });
  //     return category;
  //   });

  //   tempUserPosts.sort((a, b) => (a.datems < b.datems ? 1 : -1));
  //   let tempPoints = 0;
  //   tempUserPosts.map((post) => (tempPoints += post.votes));
  //   setProfUser(tempUser);
  //   setProfPosts(tempUserPosts);
  //   setProfPoints(tempPoints);
  // };

  useEffect(() => {
    const getUserDoc = async () => {
      //fetch data from database
      try {
        const doc = await db.collection("users").doc(username).get();
        if (doc) {
          //if user data exists, record it
          let tempUser = {
            id: doc.data().id,
            username: doc.data().username,
            email: doc.data().email,
            photo: doc.data().photo,
          };
          //record user posts
          let tempUserPosts = [];
          allCategories.map((category) => {
            category.posts.map((post) => {
              if (post.poster === username) {
                tempUserPosts.push(post);
              }
              return post;
            });
            return category;
          });
    
          tempUserPosts.sort((a, b) => (a.datems < b.datems ? 1 : -1));
          let tempPoints = 0;
          tempUserPosts.map((post) => (tempPoints += post.votes)); //record user karma/post points
          //merge all to profile data state
          setProfUser({
            ...tempUser,
            posts: tempUserPosts,
            points: tempPoints,
          });
          console.log(`${username} profile data acquired`);
        } else {
          alert("no such user");
        }
        
      } catch (err) {
        console.log(err.message);
        
      }
    };
    getUserDoc();
    
  }, [username]);

  return (
    <div className="Profile">
      {!profUser && <h1 style={{ marginTop: 20 }}>No such user</h1>}
      {profUser && (
        <>
          <div className="profile-info">
            <img src="" className="profile-pic" alt="" />
            <h2>{profUser.username}</h2>
            {currentUser.username === username && (
              <h3>Email: {profUser.email}</h3>
            )}
            <h3>Post karma:&nbsp;{profUser.points}</h3>
            <h3>Comment karma: 0</h3>
          </div>
          <div className="profile-divider"></div>
          <h3>Posts</h3>
          <div className="profile-posts">
            {profUser.posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  thisPost={post}
                  currentUser={currentUser}
                  setAllCategories={setAllCategories}
                  updateAllPosts={updateAllPosts}
                  showDelete={true}
                  isLoggedIn={isLoggedIn}
                  setShowLogin={setShowLogin}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
