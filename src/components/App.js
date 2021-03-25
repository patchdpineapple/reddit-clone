import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import components
import Navlinks from "./Navlinks";
import Main from "./Main";
import Profile from "./Profile";

//data
import arrCategories from "../data/categories";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [allCategories, setAllCategories] = useState(arrCategories);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    //get all posts
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
        <Navlinks isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Switch>
        <Route path="/reddit-clone" component={()=>(
            <Main allCategories={allCategories} allPosts={allPosts}/>
          )}  />
          <Route exact path="/" component={()=>(
            <Main allCategories={allCategories} allPosts={allPosts}/>
          )} />
          <Route path="/profile" component={()=>(
            <Profile allPosts={allPosts}/>
          )} />

        </Switch> 
      </div>
    </Router>
  );
}

export default App;
