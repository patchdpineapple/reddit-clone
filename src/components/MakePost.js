import React, { useState } from "react";
import "./MakePost.css";
import arrCategories from "../data/categories";
import { db } from "../firebase/config";

function MakePost({
  allCategories,
  setAllCategories,
  setShowMakePost,
  currentCategory,
  currentUser,
  updateAllPosts,
  setShowLoading
}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [hub, setHub] = useState(currentCategory);

  //FUNCTIONS
  const getCurrentDate = () => {  
    //generate a new current date and time
    let date = new Date();

    //get date with format yyyy-mm-dd
    let allMonths = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
    let year = date.getFullYear();
    let month = allMonths[date.getMonth()];
    let day = date.getDate();
    let combineDate = `${month} ${day}, ${year}`;

    //get time with format hh:mm:ss
    let hours = date.getHours();
    let meridiem = hours > 11 ? "PM" : "AM";

    if(hours === 0) {
        hours = 12;
    } else if (hours > 12) {
        hours = hours - 12;
    }
    let minutes = date.getMinutes();
    let combinedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${meridiem}`;

    return {
      date: combineDate,
      time: combinedTime,
      datems: date.getTime(),
    };
  };

  const getId = () => {
    //generate id
    return hub + Math.floor(Math.random() * 100000);
  };

  const addPostToFirestore = async (newPost) => {
    setShowLoading(true);
    try{
      //get current posts from database
    let doc = await db.collection("hubs").doc(hub).get();
    let currentPosts = doc.data().posts;
    let newPosts = [newPost, ...currentPosts];
    //update database posts
    await db.collection("hubs").doc(hub).update({
      posts: newPosts
    })
    //update state of all categories and posts
    const hubs = await db.collection("hubs").get(); 
    let tempHubs = [];
      hubs.forEach( doc => {
        tempHubs.push(doc.data());
      });
    setAllCategories(tempHubs);
    updateAllPosts();
    closeMakePost();
    setShowLoading(false);
    } catch(err){
      setShowLoading(false);
      console.log(err.message);
      alert(err.message);
    }
  }

  //submit handlers
  const handleSubmit = (e) => {
    //add a new post to chosen category
    e.preventDefault();
    //find index of category where the new post will be added
    // let categoryIndex = arrCategories.findIndex(
    //   (category) => category.name === hub
    // );
    //create a new post object

    let currentDate = getCurrentDate();
    let newPost = {
      id: getId(),
      category: hub,
      poster: currentUser.username,
      date: currentDate.date,
      time: currentDate.time,
      datems: currentDate.datems,
      title: title,
      text: message,
      image: "",
      votes: 1,
      voters: [
        {
          username: currentUser.username,
          vote: "upvote"
    }
    ],
      comments: [],
    };

    //add the post
    addPostToFirestore(newPost);
    // arrCategories[categoryIndex].posts.unshift(newPost);
    
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
