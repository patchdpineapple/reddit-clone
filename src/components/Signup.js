import React, { useState } from "react";
import "./Signup.css";
import { auth, db } from "../firebase/config";
import Loading from "./Loading";

function Signup({ setShowSignup, setIsLoggedIn, setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  //functions
  const checkUsernameFromDatabase = async () => {
    //check first if username exists from database
    //if not, creates a new user account and user details in database
    let usernameExist;
    let documents = await db.collection("users").get();
    documents.forEach((doc) => {
      if (doc.data().username.toUpperCase() === username.toUpperCase()) {
        usernameExist = true;
      }
    });
    if (usernameExist) {
      setShowLoading(false);
      alert("Username already exists");
    } else {
      signupToFirebase(email, password, username);
    }
  };

  const signupToFirebase = (email, password, username) => {
    //adds a new user to firebase auth with email, password and username
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return cred.user.updateProfile({
          displayName: username,
        });
      })
      .then(() => {
        //set custom user data on firestore
        return db.collection("users").doc(auth.currentUser.displayName).set({
          id: auth.currentUser.uid,
          username: auth.currentUser.displayName,
          email: auth.currentUser.email,
          password: password,
          photo: auth.currentUser.photoURL,
        });
      })
      .then(() => {
        //set current user state
        const tempUser = {
          id: auth.currentUser.uid,
          username: auth.currentUser.displayName,
          email: auth.currentUser.email,
          password: password,
          photo: auth.currentUser.photoURL,
        };
        setCurrentUser(tempUser);
        setUsername("");
        setPassword("");
        setEmail("");
        setIsLoggedIn(true);
        closeSignup();
        setShowLoading(false);
        alert(
          `Signup successful. You are now logged in as ${auth.currentUser.displayName}`
        );
      })

      .catch((err) => {
        setShowLoading(false);
        alert(err.message);
      });
  };

  //handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoading(true);
    checkUsernameFromDatabase();
  };

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
        {/* <label htmlFor="signup-username">Username:</label> */}
        <input
          className="input-signup"
          type="text"
          id="signup-username"
          name="username"
          placeholder="USERNAME"
          maxLength={20}
          onChange={handleUsernameChange}
          value={username}
          required
        />
        {/* <label htmlFor="signup-email">Email:</label> */}
        <input
          className="input-signup"
          type="email"
          id="signup-email"
          name="email"
          placeholder="EMAIL"
          onChange={handleEmailChange}
          value={email}
          required
        />
        {/* <label htmlFor="signup-password">Password:</label> */}
        <input
          className="input-signup"
          type="password"
          id="signup-password"
          name="password"
          placeholder="PASSWORD"
          minLength={6}
          onChange={handlePasswordChange}
          value={password}
          required
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {showLoading && <Loading text="Signing up..." />}
    </div>
  );
}

export default Signup;
