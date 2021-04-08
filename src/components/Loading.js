import React from "react";
import "./Loading.css";

function Loading({ text }) {
  return (
    <div className="Loading">
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loading;
