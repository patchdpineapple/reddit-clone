import React from "react";
import "./Navlinks.css";
import { Link } from "react-router-dom";

function LoggedIn() {
  return (
    <ul className="nav-links">
          <li><Link to="/profile" className="link btn btn-link btn-username">Username</Link></li>
          <li><Link to="/" className="link btn btn-link btn-logout">Logout</Link></li>
        </ul>
  );
}

function LoggedOut() {
  return (
    <ul className="nav-links">
          <li><Link to="/login" className="link btn btn-link btn-login">Login</Link></li>
          <li><Link to="/signup" className="link btn btn-link btn-signup">Sign Up</Link></li>
        </ul>
  );
}

function Navlinks({isLoggedIn}) {
  return (
  <div className="Navlinks">
    <h1 className="nav-logo"><Link to="/" className="link">The Hub</Link></h1>
        {isLoggedIn ? <LoggedIn /> : <LoggedOut />}
  </div>
  );
}

export default Navlinks;
