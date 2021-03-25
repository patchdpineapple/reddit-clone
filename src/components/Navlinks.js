import React from "react";
import "./Navlinks.css";
import { Link } from "react-router-dom";

function LoggedIn({setIsLoggedIn}) {
  const handleLogout = ()=>{
    setIsLoggedIn(false);
  }
  return (
    <ul className="nav-links">
          <li><Link to="/profile" className="link btn btn-link btn-username">GuestUser</Link></li>
          <li><Link to="/" className="link btn btn-link btn-logout" onClick={handleLogout} >Logout</Link></li>
        </ul>
  );
}

function LoggedOut({setIsLoggedIn, setShowSignup}) {
  const handleLogin = ()=>{
    setIsLoggedIn(true);
  }

  const handleSignup = ()=>{
    setShowSignup(true);
  }

  return (
    <ul className="nav-links">
          <li><Link to="/" className="link btn btn-link btn-login" onClick={handleLogin} >Login</Link></li>
          <li><button className="link btn btn-link btn-signup" onClick={handleSignup}>Sign Up</button></li>
        </ul>
  );
}

function Navlinks({isLoggedIn, setIsLoggedIn, setShowSignup}) {
  return (
  <div className="Navlinks">
    <h1 className="nav-logo"><Link to="/" className="link">The Hub</Link></h1>
        {isLoggedIn ? <LoggedIn setIsLoggedIn={setIsLoggedIn} /> : <LoggedOut setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} />}
  </div>
  );
}

export default Navlinks;
