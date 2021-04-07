import React, { useState } from "react";
import "./Login.css";
import accounts from "../data/accounts";
import { auth, db } from "../firebase/config";
import Loading from "./Loading";


function Login({ setShowLogin, setIsLoggedIn, setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  //functions
  // const loginToFirebase = (email, password) => {
  //   auth.signInWithEmailAndPassword(email, password).then((cred)=>{
  //     const username = cred.user.username
  //     const id = cred.user.uid;

  //     let guestUser = accounts[0];
  //   setCurrentUser(guestUser);
  //   setIsLoggedIn(true);
  //   setUsername("");
  //   setPassword("");
  //   closeLogin();


  //     setShowLoading(false);
  //     console.log("successfully logged in");
  //     alert(`Successfully logged in as ${username}`);
  //   }).catch(err=>{
  //     setShowLoading(false);
  //     console.log(err.message);
  //     alert(err.message);
  //   })
  // }

  const loginToFirebase = async (email, password) => {
    try {
      const cred = await auth.signInWithEmailAndPassword(email, password);
      const id = cred.user.uid;
      const doc = await db.collection("users").doc(id).get();
      const tempUser = {
        id: doc.data().id,
        username: doc.data().username,
        email: doc.data().email,
        photo: doc.data().photo
      }
      setCurrentUser(tempUser);
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      closeLogin();
      setShowLoading(false);
      console.log("successfully logged in");
      alert(`Successfully logged in as ${doc.data().username}`);
    } catch(err){
      setShowLoading(false);
      console.log(err.message);
      alert(err.message);
    }
  }

  //submit handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    //display loading
    setShowLoading(true);
    loginToFirebase(email, password);

    //check if account exists
    /*
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
*/

  };

  const handleGuest = (e) => {
    //this method sets current user to guest account
    e.preventDefault();
    setShowLoading(true);
    const email="guestuser@guestuser.com";
    const password="test123";
    loginToFirebase(email, password);


    // let guestUser = accounts[0];
    // setCurrentUser(guestUser);
    // setIsLoggedIn(true);
    // setUsername("");
    // setPassword("");
    // closeLogin();
  };

  //input onchange handlers
  const closeLogin = () => {
    setShowLogin(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
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
        {/* <label htmlFor="login-username">Username:</label>
        <input
          className="input-login"
          type="text"
          id="login-username"
          name="username"
          placeholder="User"
          onChange={handleUsernameChange}
          value={username}
          required
        /> */}

<label htmlFor="login-email">Email:</label>
        <input
          className="input-login"
          type="text"
          id="login-email"
          name="email"
          placeholder="email"
          onChange={handleEmailChange}
          value={email}
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
      {showLoading && (
          <Loading text="Logging in..." />
        )}
    </div>
  );
}

export default Login;
