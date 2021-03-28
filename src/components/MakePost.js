import React, { useState } from "react";
import "./MakePost.css";

function MakePost({ allCategories, setAllCategories, setShowMakePost, currentCategory }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [hub, setHub] = useState(currentCategory);

  const closeMakePost = () => {
    setShowMakePost(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeMakePost();
  };

  //input handlers
  const handleHubChange = (e) => {
    setHub(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="MakePost" onClick={closeMakePost}>
      <form
        className="post-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>MAKE POST</h1>
        <label htmlFor="make-post-category" style={{"fontSize": "10px"}}>Select Hub &nbsp;
        <select
          name="category"
          id="make-post-category"
          value={hub}
          onChange={handleHubChange}
          required
        >
          <option value=""></option>
          {allCategories.map((category) => {
            console.log(category.name);
            return (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            );
          })}
        </select>
        </label>
       

        <input
          type="title"
          id="make-post-title"
          name="title"
          placeholder="Title"
          required
          onChange={(e) => handleTitleChange(e)}
          value={title}
        />
        <textarea
          id="make-post-message"
          placeholder="Message(Optional)"
          onChange={(e) => handleMessageChange(e)}
          value={message}
        ></textarea>
        <span className="btn btn-attach-img">Attach image</span>
        <button className="btn btn-submit-post" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default MakePost;
