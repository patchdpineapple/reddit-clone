import React from 'react';
import "./Login.css";
import guest from "../data/guest";
import accounts from "../data/accounts";


function Login({ setShowLogin, setIsLoggedIn, currentUser, setCurrentUser, setUserPosts, allPosts }) {
    const closeLogin = () => {
        setShowLogin(false);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        closeLogin();
      };

      const handleGuest = (e) => {
        //set current user to guest account

        e.preventDefault();

        let guestUser = accounts[0];
        let tempUserPosts = allPosts.filter((post) => {
          let idChecker = false;
          //check if post id is the same to user post id
          guestUser.postsIds.map((id) => {
            if (id === post.id) idChecker = true;
            return id;
          });
          return idChecker;
        });

        setCurrentUser(guestUser);
        setUserPosts(tempUserPosts);


        setIsLoggedIn(true);
        closeLogin();
      }

    return (
        <div className="Login" onClick={closeLogin}>
            <form
        className="login-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={ e => handleSubmit(e) }
      >
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input
          className="input-login"
          type="text"
          id="login-username"
          name="username"
          placeholder="User"
          required
        />
       
        <label htmlFor="password">Password:</label>
        <input
          className="input-login"
          type="password"
          id="login-password"
          name="password"
          placeholder="password"
          required
        />
        <button className="btn" type="submit">Submit</button>
        <button className="btn" onClick={ e => handleGuest(e)}>Guest</button>
      </form>
        </div>
    )
}

export default Login
