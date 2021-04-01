import React, { useState } from "react";
import "./Signup.css";
import accounts from "../data/accounts";

function Signup({ setShowSignup, setIsLoggedIn, setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //submit handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    //check if account exists
    let user = accounts.find(
      (account) => account.username.toUpperCase() === username.toUpperCase()
    );
    if (user) alert("Account already exists");
    else {
      //add new user account to database
      let newUser = {
        id: Math.floor(Math.random() * 10000),
        username: username,
        password: password,
        email: email,
        postPoints: 0,
        commentPoints: 0,
        postsIds: [],
        hubs: [],
      };
      accounts.push(newUser);

      //automatically login the newly created account
      user = accounts.find(
        (account) => account.username.toUpperCase() === username.toUpperCase()
      );
      setCurrentUser(user);
      setUsername("");
      setPassword("");
      setEmail("");
      setIsLoggedIn(true);
      closeSignup();
    }
  };

  //input onchange handlers
  const closeSignup = () => {
    setShowSignup(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="Signup" onClick={closeSignup}>
      <form
        className="signup-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>Signup</h1>
        <label htmlFor="signup-username">Username:</label>
        <input
          className="input-signup"
          type="text"
          id="signup-username"
          name="username"
          placeholder="User"
          onChange={handleUsernameChange}
          value={username}
          required
        />
        <label htmlFor="signup-email">Email:</label>
        <input
          className="input-signup"
          type="email"
          id="signup-email"
          name="email"
          placeholder="sample@sample.com"
          onChange={handleEmailChange}
          value={email}
          required
        />
        <label htmlFor="signup-password">Password:</label>
        <input
          className="input-signup"
          type="password"
          id="signup-password"
          name="password"
          placeholder="password"
          onChange={handlePasswordChange}
          value={password}
          required
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
