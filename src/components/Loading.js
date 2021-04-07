import React from "react";
import "./Loading.css";

function Loading({ text }) {
  return (
    <div className="Loading">
      <div className="loading-container">
        <h1>{text}</h1>
      </div>
    </div>
  );
}

export default Loading;
