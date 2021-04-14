import React, { useState } from "react";
import "./Login.css";
import { auth } from "../firebase/config";

function Login({ setShowLogin, setShowLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //functions
  const loginToFirebase = async (email, password) => {
    //login with email and password
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      closeLogin();
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      alert(err.message);
    }
  };

  //submit handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    //display loading
    setShowLoading(true);
    loginToFirebase(email, password);
  };

  const handleGuest = (e) => {
    //sets current user to guest account
    e.preventDefault();
    setShowLoading(true);
    const email = "guestuser@guestuser.com";
    const password = "test123";
    loginToFirebase(email, password);
  };

  //handlers
  const closeLogin = () => {
    setShowLogin(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
        {/* <label htmlFor="login-email">Email:</label> */}
        <input
          className="input-login"
          type="text"
          id="login-email"
          name="email"
          placeholder="EMAIL"
          onChange={handleEmailChange}
          value={email}
          required
        />
        {/* <label htmlFor="password">Password:</label> */}
        <input
          className="input-login"
          type="password"
          id="login-password"
          name="password"
          placeholder="PASSWORD"
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
