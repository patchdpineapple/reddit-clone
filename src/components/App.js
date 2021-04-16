import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth, db } from "../firebase/config";

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
import Loading from "./Loading";

/* COMPONENT */
function App() {
  //ui state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMakePost, setShowMakePost] = useState(false);
  const [showNewHub, setShowNewHub] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  //data state
  const [allCategories, setAllCategories] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentCategory, setCurrentCategory] = useState("");
  const [categoryPosts, setCategoryPosts] = useState([]);

  //FUNCTIONS
  const getHubsFromFirestore = async () => {
    //get all hubs from database then set as state
    setShowLoading(true);
    try {
      const hubs = await db.collection("hubs").get();
      let tempHubs = [];
      hubs.forEach((doc) => {
        tempHubs.push(doc.data());
      });
      setAllCategories(tempHubs);
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      alert(err.message);
    }
  };

  const updateAllPosts = async () => {
    //get all posts from all categories
    try {
      let tempPosts = [];
      let hubs = await db.collection("hubs").get();
      hubs.forEach((doc) => {
        tempPosts = [...tempPosts, ...doc.data().posts];
      });

      //sort all posts by newest to oldest
      tempPosts.sort((a, b) => (a.datems < b.datems ? 1 : -1));
      //update all posts state
      setAllPosts(tempPosts);
    } catch (err) {
      alert(err.message);
    }
  };

  const getUserDataFromFirestore = async (username) => {
    //if user is logged in, set state of current user and nav bar
    try {
      if(!username){
      setShowLoading(false);
        return;
      }
      const doc = await db.collection("users").doc(username).get();
      const tempUser = {
        id: doc.data().id,
        username: doc.data().username,
        email: doc.data().email,
        photo: doc.data().photo,
      };
      setCurrentUser(tempUser);
      setIsLoggedIn(true);
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      alert(err.message);
    }
  };

  //USE EFFECT
  useEffect(() => {
    //authenticate user on mount
    //check auth status if a user is logged in
    setShowLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        //if logged in
        getUserDataFromFirestore(user.displayName);
      } else {
        setShowLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    getHubsFromFirestore();
    return () => {
      getHubsFromFirestore();
    };
  }, []);

  useEffect(() => {
    updateAllPosts();
  }, []);

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
        {showLoading && <Loading text="Authenticating..." />}
        {showLogin && (
          <Login setShowLogin={setShowLogin} setShowLoading={setShowLoading} />
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
            setShowLoading={setShowLoading}
          />
        )}
        {showNewHub && (
          <NewHub
            setShowNewHub={setShowNewHub}
            allCategories={allCategories}
            setAllCategories={setAllCategories}
          />
        )}
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
                setShowLogin={setShowLogin}
                setShowLoading={setShowLoading}
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
                setShowLogin={setShowLogin}
                setShowLoading={setShowLoading}
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
                isLoggedIn={isLoggedIn}
                setShowLogin={setShowLogin}
                setShowLoading={setShowLoading}
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
                setShowLogin={setShowLogin}
                setShowLoading={setShowLoading}
              />
            )}
          />
          <Route
            path="/post/:id"
            component={() => (
              <Comments
                isLoggedIn={isLoggedIn}
                allCategories={allCategories}
                setAllCategories={setAllCategories}
                currentUser={currentUser}
                updateAllPosts={updateAllPosts}
                setShowLogin={setShowLogin}
                setShowLoading={setShowLoading}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
