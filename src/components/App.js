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

//data
import arrCategories from "../data/categories";

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

  

  const getUserDataFromFirestore = async (id) => {
    const doc = await db.collection("users").doc(id).get();
      const tempUser = {
        id: doc.data().id,
        username: doc.data().username,
        email: doc.data().email,
        photo: doc.data().photo
      }
      setCurrentUser(tempUser);
      setIsLoggedIn(true);
      setShowLoading(false);
  }

  const checkFirebaseAuthentication = () => {
    auth.onAuthStateChanged( user => {
      if(user){
        setShowLoading(true);
        console.log(`logged in as`, user.displayName);
        console.log(`logged in ID`, user.uid);
        getUserDataFromFirestore(user.uid);
      } else {
        console.log("logged out");
      }
    });
  }

  //USE EFFECT
  
    useEffect(() => {
      checkFirebaseAuthentication();
  }, []); 


  useEffect(() => {
    console.log("updated allPosts");
    updateAllPosts();
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
          setCurrentUser={setCurrentUser}
        />
        {showLoading && (
          <Loading text="Logging in..." />
        )}
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
                setShowLogin={setShowLogin}
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
              />
            )}
          />
          <Route
            path="/post/:id"
            component={() => (
              <Comments
                isLoggedIn={isLoggedIn}
                setAllCategories={setAllCategories}
                currentUser={currentUser}
                updateAllPosts={updateAllPosts}
                setShowLogin={setShowLogin}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
