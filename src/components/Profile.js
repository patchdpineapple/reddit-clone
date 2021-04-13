import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { Post } from "./Main";
import { db } from "../firebase/config";

function Profile({
  allCategories,
  currentUser,
  setAllCategories,
  updateAllPosts,
  isLoggedIn,
  setShowLogin,
  setShowLoading,
}) {
  let { username } = useParams();
  const [profUser, setProfUser] = useState(null);

  //USE EFFECT
  useEffect(() => {
    let isMounted = true;
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
          if (isMounted) {
            setProfUser({
              ...tempUser,
              posts: tempUserPosts,
              points: tempPoints,
            });
          }
        } else {
          alert("no such user");
        }
      } catch (err) {
        alert(err.message);
      }
    };
    getUserDoc();

    return () => {
      isMounted = false;
    };
  }, [username, allCategories]);

  return (
    <div className="Profile">
      {!profUser && <h1 style={{ marginTop: 20 }}>No such user</h1>}
      {profUser && (
        <>
          <div className="profile-info">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/thehub-reddit-clone.appspot.com/o/placeholders%2Fprofile_placeholder2.png?alt=media&token=5f64c241-7b43-42d4-88ec-b61b4f5e9fcf"
              className="profile-pic"
              alt=""
            />
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
                  allCategories={allCategories}
                  setAllCategories={setAllCategories}
                  updateAllPosts={updateAllPosts}
                  showDelete={true}
                  isLoggedIn={isLoggedIn}
                  setShowLogin={setShowLogin}
                  setShowLoading={setShowLoading}
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
