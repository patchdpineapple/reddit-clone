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
import NewHub from "./NewHub";

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
  const [currentCategory, setCurrentCategory] = useState("");
  const [categoryPosts, setCategoryPosts] = useState([]);

  //FUNCTIONS
  const updateAllPosts = () => {
    //get all posts from all categories
    let tempPosts = [];
    allCategories.map((category) => {
      category.posts.map((post) => {
        tempPosts.push(post);
        return post;
      });
      return category;
    });

    //sort all posts by newest to oldest
    tempPosts.sort((a, b) => (a.datems < b.datems ? 1 : -1));
    //update all posts state
    setAllPosts(tempPosts);
  };

  //USE EFFECT
  useEffect(() => {
    updateAllPosts();
  }, []); /*
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
  */

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
          setCurrentUser={setCurrentUser}
        />
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        )}
        {showSignup && (
          <Signup
            setShowSignup={setShowSignup}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        )}
        {showMakePost && (
          <MakePost
            allCategories={allCategories}
            setAllCategories={setAllCategories}
            setShowMakePost={setShowMakePost}
            currentCategory={currentCategory}
            currentUser={currentUser}
            updateAllPosts={updateAllPosts}
          />
        )}
        {showNewHub && <NewHub setShowNewHub={setShowNewHub} />}
        <Switch>
          <Route
            path="/reddit-clone"
            component={() => (
              <Main
                allCategories={allCategories}
                allPosts={allPosts}
                isLoggedIn={isLoggedIn}
                setShowMakePost={setShowMakePost}
                setShowNewHub={setShowNewHub}
                categoryName={currentCategory}
                categoryPosts={categoryPosts}
                setCategoryPosts={setCategoryPosts}
                currentUser={currentUser}
                setAllCategories={setAllCategories}
                updateAllPosts={updateAllPosts}
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
                setShowNewHub={setShowNewHub}
                categoryName={currentCategory}
                categoryPosts={categoryPosts}
                setCategoryPosts={setCategoryPosts}
                currentUser={currentUser}
                setAllCategories={setAllCategories}
                updateAllPosts={updateAllPosts}
              />
            )}
          />
          <Route
            path="/profile/:username"
            component={() => (
              <Profile
                allCategories={allCategories}
                currentUser={currentUser}
                setAllCategories={setAllCategories}
              updateAllPosts={updateAllPosts}
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
                setShowNewHub={setShowNewHub}
                categoryPosts={categoryPosts}
                setCategoryPosts={setCategoryPosts}
                currentUser={currentUser}
                setAllCategories={setAllCategories}
                updateAllPosts={updateAllPosts}
              />
            )}
          />
          <Route
            path="/post/:id"
            component={() => (
              <Comments
                allPosts={allPosts}
                isLoggedIn={isLoggedIn}
                setAllCategories={setAllCategories}
                currentUser={currentUser}
                updateAllPosts={updateAllPosts}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
