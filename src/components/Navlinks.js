import React from "react";
import "./Navlinks.css";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";

function LoggedIn({ setIsLoggedIn, currentUser, setCurrentUser }) {
  const handleLogout = () => {
    auth.signOut().then(() => {
      setCurrentUser({});
      setIsLoggedIn(false);
    });
  };
  return (
    <ul className="nav-links">
      <li>
        <Link
          to={`/profile/${currentUser.username}`}
          className="link btn btn-link btn-username"
        >
          {currentUser.username}
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="link btn btn-link btn-logout"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
}

function LoggedOut({ setIsLoggedIn, setShowLogin, setShowSignup }) {
  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleSignup = () => {
    setShowSignup(true);
  };

  return (
    <ul className="nav-links">
      <li>
        <button className="link btn btn-link btn-login" onClick={handleLogin}>
          Login
        </button>
      </li>
      <li>
        <button className="link btn btn-link btn-signup" onClick={handleSignup}>
          Sign Up
        </button>
      </li>
    </ul>
  );
}

/***** PARENT COMPONENT *****/
function Navlinks({
  isLoggedIn,
  setIsLoggedIn,
  setShowLogin,
  setShowSignup,
  setCurrentCategory,
  currentUser,
  setCurrentUser,
}) {
  const resetCurrentCategory = () => {
    setCurrentCategory("");
  };

  return (
    <div className="Navlinks">
      <h1 className="nav-logo">
        <Link to="/" className="link" onClick={resetCurrentCategory}>
          TheHub
        </Link>
      </h1>
      {isLoggedIn ? (
        <LoggedIn
          setIsLoggedIn={setIsLoggedIn}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <LoggedOut
          setIsLoggedIn={setIsLoggedIn}
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
        />
      )}
    </div>
  );
}

export default Navlinks;
