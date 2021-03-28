import React from "react";
import "./Navlinks.css";
import { Link } from "react-router-dom";

function LoggedIn({setIsLoggedIn, currentUser}) {
  const handleLogout = ()=>{
    setIsLoggedIn(false);
  }
  return (
    <ul className="nav-links">
          <li><Link to="/profile" className="link btn btn-link btn-username">{currentUser.username}</Link></li>
          <li><Link to="/" className="link btn btn-link btn-logout" onClick={handleLogout} >Logout</Link></li>
        </ul>
  );
}

function LoggedOut({setIsLoggedIn, setShowLogin, setShowSignup}) {
  const handleLogin = ()=>{
    setShowLogin(true);
  }

  const handleSignup = ()=>{
    setShowSignup(true);
  }

  return (
    <ul className="nav-links">
          <li><button className="link btn btn-link btn-login" onClick={handleLogin} >Login</button></li>
          <li><button className="link btn btn-link btn-signup" onClick={handleSignup}>Sign Up</button></li>
        </ul>
  );
}

function Navlinks({isLoggedIn, setIsLoggedIn, setShowLogin, setShowSignup, setCurrentCategory, currentUser }) {
  const resetCurrentCategory = () => {
    setCurrentCategory("");
  }

  return (
  <div className="Navlinks">
    <h1 className="nav-logo"><Link to="/" className="link" onClick={resetCurrentCategory}>The Hub</Link></h1>
        {isLoggedIn ? <LoggedIn setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} /> : <LoggedOut setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} setShowSignup={setShowSignup} />}
  </div>
  );
}

export default Navlinks;
