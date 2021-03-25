import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import components
import Navlinks from "./Navlinks";
import Main from "./Main";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <div className="App">
        <Navlinks isLoggedIn={isLoggedIn} />
        <Switch>
        <Route path="/reddit-clone" component={Main} />
          <Route exact path="/" component={Main} />

        </Switch> 
      </div>
    </Router>
  );
}

export default App;
