import React, { useState } from "react";
import "./Login.css";
import accounts from "../data/accounts";

function Login({ setShowLogin, setIsLoggedIn, setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //submit handlers
  const handleSubmit = (e) => {
    e.preventDefault();

    let user = accounts.find((account) => account.username.toUpperCase() === username.toUpperCase());
    if (user) {
      if (password === user.password) {
        setCurrentUser(user);
        setUsername("");
        setPassword("");
        setIsLoggedIn(true);
        closeLogin();
      } else alert("Wrong password");
    } else alert("No such username");

  };

  const handleGuest = (e) => {
    //this method sets current user to guest account
    e.preventDefault();
    let guestUser = accounts[0];
    setCurrentUser(guestUser);
    setIsLoggedIn(true);
    setUsername("");
    setPassword("");
    closeLogin();
  };

  //input onchange handlers
  const closeLogin = () => {
    setShowLogin(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="Login" onClick={closeLogin}>
      <form
        className="login-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>Login</h1>
        <label htmlFor="login-username">Username:</label>
        <input
          className="input-login"
          type="text"
          id="login-username"
          name="username"
          placeholder="User"
          onChange={handleUsernameChange}
          value={username}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          className="input-login"
          type="password"
          id="login-password"
          name="password"
          placeholder="password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
        <button className="btn" type="submit">
          Submit
        </button>
        <button className="btn" onClick={(e) => handleGuest(e)}>
          Guest
        </button>
      </form>
    </div>
  );
}

export default Login;
