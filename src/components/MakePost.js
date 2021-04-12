import React, { useState } from "react";
import "./MakePost.css";
import arrCategories from "../data/categories";
import { db, storage } from "../firebase/config";

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [hub, setHub] = useState(currentCategory);
  const [progress, setProgress] = [0];

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

  const addPostToFirestore = async (newPost, imageFile) => {
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
    } catch(err){
      console.log(err.code, err.message);
      alert(err.message);
    }
  }

  const uploadImage =  (file, postId) => {
    const storageRef = storage.ref(`postImages/${postId}/${selectedImage.name}`);
    let url;
     storageRef.put(file).on("state_changed", (snapshot)=>{
      console.log("status", snapshot.state)
    }, (err)=>{
      alert(err.message);
    },async () => {
      url = await storageRef.getDownloadURL();
    })
    console.log("upload successful url: ", url);
    return url;
  }

  //submit handlers
  const handleSubmit = async (e) => {
    //add a new post to chosen category
    e.preventDefault();
    setShowLoading(true);

    let currentDate = getCurrentDate();
    let postId = getId();
    let imageURL="";

    //create a new post object
    let newPost = {
      id: postId,
      category: hub,
      poster: currentUser.username,
      date: currentDate.date,
      time: currentDate.time,
      datems: currentDate.datems,
      title: title,
      text: message,
      image: imageURL,
      votes: 1,
      voters: [
        {
          username: currentUser.username,
          vote: "upvote"
    }
    ],
      comments: [],
    };

    //if an image is selected,upload image to firebase storage
    
      if(selectedImage){
        const storageRef = storage.ref(`postImages/${postId}/${selectedImage.name}`);
        const uploadTask = storageRef.put(selectedImage);
        uploadTask.on("state_changed", (snapshot)=>{
          console.log("status", snapshot.state)
        }, (err)=>{
          alert(err.message);
        },async () => {
          imageURL = await storageRef.getDownloadURL();
          newPost.image = imageURL;
          console.log("upload sucess url: ", imageURL);
          await addPostToFirestore(newPost);
          setSelectedImage(null);
          setShowLoading(false);
        })
      } else {
        await addPostToFirestore(newPost);
        setShowLoading(false);
      }
    
    //add the post
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

  const handleAttachImage = (e) => {
    // let fileName = extractFilename(e.target.value);
    // setFileURL(fileName);
    const types = ["image/png", "image/jpg", "image/jpeg"];
    let selected = e.target.files[0];

    if(selected && types.includes(selected.type)){
      setSelectedImage(selected);
    } else {
      setSelectedImage(null);
      alert("Only jpg or png images are allowed.")
    }
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
        {/* <span className="btn btn-attach-img">Attach image</span> */}
        <input type="file" id="attach-image" name="attach-image" accept="image/png, image/jpeg" onChange={(e) => handleAttachImage(e)} />
        <button className="btn btn-submit-post" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}

export default MakePost;
