import React from "react";
import "./MakePost.css";

function MakePost({ setShowMakePost }) {
  const closeMakePost = () => {
    setShowMakePost(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeMakePost();
  };

  return (
    <div className="MakePost" onClick={closeMakePost}>
      <form
        className="post-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>MAKE POST</h1>
        <button className="btn btn-submit-post" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default MakePost;
