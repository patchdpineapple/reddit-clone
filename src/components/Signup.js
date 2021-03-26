import React from "react";
import "./Signup.css";

function Signup({ setShowSignup }) {
  const closeSignup = () => {
    setShowSignup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeSignup();
  };

  return (
    <div className="Signup" onClick={closeSignup}>
      <form
        className="signup-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>Signup</h1>
        <label for="username">Username:</label>
        <input
          className="input-signup"
          type="text"
          id="username"
          name="username"
          placeholder="User"
          required
        />
        <label for="email">Email:</label>
        <input
          className="input-signup"
          type="email"
          id="email"
          name="email"
          placeholder="sample@sample.com"
          required
        />
        <label for="password">Password:</label>
        <input
          className="input-signup"
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required
        />
        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
