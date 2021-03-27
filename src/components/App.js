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

//data
import arrCategories from "../data/categories";
import guest from "../data/guest";

function App() {
  //ui state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMakePost, setShowMakePost] = useState(false);
  //data state
  const [allCategories, setAllCategories] = useState(arrCategories);
  const [allPosts, setAllPosts] = useState([]);
  const [guestData, setGuestData] = useState(guest);
  const [userPosts, setUserPosts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

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
        />
        {showLogin && (
          <Login setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />
        )}
        {showSignup && <Signup setShowSignup={setShowSignup} />}
        {showMakePost && (
          <MakePost
            allCategories={allCategories}
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
              />
            )}
          />
          <Route
            path="/profile"
            component={() => (
              <Profile
                allPosts={allPosts}
                guestData={guestData}
                setGuestData={setGuestData}
                userPosts={userPosts}
                setUserPosts={setUserPosts}
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
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
