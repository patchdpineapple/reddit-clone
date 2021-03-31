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
import NewHub from "./NewHub"

//data
import arrCategories from "../data/categories";
import accounts from "../data/accounts";

/* COMPONENT */
function App() {
  //ui state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMakePost, setShowMakePost] = useState(false);
  const [showNewHub, setShowNewHub] = useState(false);

  //data state
  const [allCategories, setAllCategories] = useState(arrCategories);
  const [allPosts, setAllPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentPost, setCurrentPost] = useState({});

  //FUNCTIONS

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
  }, [allCategories]);

  //RENDER
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
        {showNewHub && <NewHub setShowNewHub={setShowNewHub}/>}
        <Switch>
          <Route
            path="/reddit-clone"
            component={() => (
              <Main
                allCategories={allCategories}
                allPosts={allPosts}
                isLoggedIn={isLoggedIn}
                setShowMakePost={setShowMakePost}
                setCurrentPost={setCurrentPost}
                setShowNewHub={setShowNewHub}
              />
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
                setShowNewHub={setShowNewHub}
              />
            )}
          />
          <Route
            path="/profile/:username"
            component={() => (
              <Profile allPosts={allPosts} setCurrentPost={setCurrentPost} />
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
                allPosts={allPosts}
                setCurrentPost={setCurrentPost}
              isLoggedIn={isLoggedIn}
              setAllCategories={setAllCategories}

              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
