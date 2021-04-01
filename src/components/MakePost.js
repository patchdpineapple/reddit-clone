import React, { useState, useEffect } from "react";
import "./MakePost.css";
import { Link } from "react-router-dom";
import arrCategories from "../data/categories";

function MakePost({
  allCategories,
  setAllCategories,
  setShowMakePost,
  currentCategory,
  currentUser,
  updateAllPosts,
}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [hub, setHub] = useState(currentCategory);

  //FUNCTIONS
  const getCurrentDate = () => {
    //generate a new current date and time
    let date = new Date();

    //get date with format yyyy-mm-dd
    let year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    month = month.toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
      day = "0" + day;
    }

    let combineDate = `${year}-${month}-${day}`;

    //get time with format hh:mm:ss
    let a = date.getHours().toString();
    if (a.length === 1) a = `0${a}`;
    let b = date.getMinutes().toString();
    if (b.length === 1) b = `0${b}`;
    let c = date.getSeconds().toString();
    if (c.length === 1) c = `0${c}`;

    let combinedTime = `${a}:${b}:${c}`;

    return {
      date: combineDate,
      time: combinedTime,
      fulldate: date,
    };
  };

  const getId = () => {
    //generate id
    return hub + Math.floor(Math.random() * 10000);
  };

  //submit handlers
  const handleSubmit = (e) => {
    //add a new post to chosen category
    e.preventDefault();
    //find index of category where the new post will be added
    let categoryIndex = arrCategories.findIndex(
      (category) => category.name === hub
    );
    //create a new post object

    let currentDate = getCurrentDate();
    let newPost = {
      id: getId(),
      category: hub,
      poster: currentUser.username,
      date: currentDate.date,
      time: currentDate.time,
      fulldate: currentDate.fulldate,
      title: title,
      text: message,
      image: "",
      votes: 1,
      comments: [],
    };

    //add the post
    arrCategories[categoryIndex].posts.unshift(newPost);
    //update all posts list
    updateAllPosts();
    //update database state
    setAllCategories(arrCategories);

    closeMakePost();
  };

  //input onchange handlers
  const closeMakePost = () => {
    setShowMakePost(false);
  };

  const handleHubChange = (e) => {
    setHub(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  //USE EFFECT

  return (
    <div className="MakePost" onClick={closeMakePost}>
      <form
        className="post-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>MAKE POST</h1>
        <label htmlFor="make-post-category" style={{ fontSize: "10px" }}>
          Select Hub &nbsp;
          <select
            name="category"
            id="make-post-category"
            value={hub}
            onChange={handleHubChange}
            required
          >
            <option value=""></option>
            {allCategories.map((category) => {
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
