import React from 'react';
import "./Login.css";

function Login({ setShowLogin, setIsLoggedIn }) {
    const closeLogin = () => {
        setShowLogin(false);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        closeLogin();
      };

      const handleGuest = (e) => {
        e.preventDefault();
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
        <label for="username">Username:</label>
        <input
          className="input-login"
          type="text"
          id="login-username"
          name="username"
          placeholder="User"
          required
        />
       
        <label for="password">Password:</label>
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