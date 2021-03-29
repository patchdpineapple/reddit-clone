import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import components
import Navlinks from "./Navlinks";
import Main from "./Main";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import HubPage from "./HubPage";
import MakePost from "./MakePost";
import Comments from "./Comments";

//data
import arrCategories from "../data/categories";

function App() {
  //ui state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMakePost, setShowMakePost] = useState(false);
  //data state
  const [allCategories, setAllCategories] = useState(arrCategories);
  const [allPosts, setAllPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentPost, setCurrentPost] = useState({});
  const [profileUser, setProfileUser] = useState({});
  const [profilePosts, setProfilePosts] = useState([]);


  //USE EFFECT
  useEffect(() => {
    //get all posts from all categories
    let tempPosts = [];
    allCategories.map((category) => {
      category.posts.map((post) => {
        tempPosts.push(post);
        return post;
      });
      return category;
    });
    setAllPosts(tempPosts);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navlinks
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
          setCurrentCategory={setCurrentCategory}
          currentUser={currentUser}
        />
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setIsLoggedIn={setIsLoggedIn}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setUserPosts={setUserPosts}
            allPosts={allPosts}

          />
        )}
        {showSignup && <Signup setShowSignup={setShowSignup} />}
        {showMakePost && (
          <MakePost
            allCategories={allCategories}
            setAllCategories={setAllCategories}
            setShowMakePost={setShowMakePost}
            currentCategory={currentCategory}
          />
        )}
        <Switch>
          <Route
            path="/reddit-clone"
            component={() => (
              <Main allCategories={allCategories} allPosts={allPosts} />
            )}
          />
          <Route
            exact
            path="/"
            component={() => (
              <Main
                allCategories={allCategories}
                allPosts={allPosts}
                isLoggedIn={isLoggedIn}
                setShowMakePost={setShowMakePost}
                setCurrentPost={setCurrentPost}
                setProfileUser={setProfileUser}
                setProfilePosts={setProfilePosts}
              />
            )}
          />
          <Route
            path="/profile/:username"
            component={() => (
              <Profile
                allPosts={allPosts}
                setCurrentPost={setCurrentPost}
                profileUser={profileUser}
                profilePosts={profilePosts}
                setProfileUser={setProfileUser}
                setProfilePosts={setProfilePosts}
              />
            )}
          />
          <Route
            path="/hub/:category"
            component={() => (
              <HubPage
                allCategories={allCategories}
                allPosts={allPosts}
                isLoggedIn={isLoggedIn}
                setShowMakePost={setShowMakePost}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory}
                setCurrentPost={setCurrentPost}
              />
            )}
          />
          <Route
            path="/post/:id"
            component={() => (
              <Comments
                post={currentPost}
                allPosts={allPosts}
                setCurrentPost={setCurrentPost}
                setProfileUser={setProfileUser}
                setProfilePosts={setProfilePosts}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
