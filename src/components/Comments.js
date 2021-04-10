import React, { useState, useEffect } from "react";
import "./Comments.css";
import { Link, useParams } from "react-router-dom";
import { Post } from "./Main";
import arrCategories from "../data/categories";
import { db } from "../firebase/config";
import Loading from "./Loading";

function Comment({
  id,
  user,
  text,
  thisPost,
  currentUser,
  allCategories,
  setAllCategories,
  updateAllPosts,
  setShowLoad
}) {
  //states
  const [showEdit, setShowEdit] = useState(false);
  const [newComment, setNewComment] = useState(text);

  //functions
  const getCommentIndexes = () => {
    //returns indexes for finding this comment from the database
    //find index of category where post belongs
    let categoryIndex = allCategories.findIndex(
      (category) => category.name === thisPost.category
    );
    //find index of post from the same category
    let postIndex = allCategories[categoryIndex].posts.findIndex(
      (post) => post.id === thisPost.id
    );
    //find index of comment
    let commentIndex = allCategories[categoryIndex].posts[
      postIndex
    ].comments.findIndex((comment) => comment.id === id);

    return {
      categoryIndex: categoryIndex,
      postIndex: postIndex,
      commentIndex: commentIndex,
    };
  };

  //handlers

  const handleDeleteComment = async () => {
    //delete comment from firestore and update state
    try {
      setShowLoad(true);
      //get posts from firestore
      let doc = await db.collection("hubs").doc(thisPost.category).get();
      let posts = doc.data().posts;
      //delete the comment
      posts.forEach((post) => {
        if (post.id === thisPost.id) {
          let index = post.comments.findIndex((comment) => comment.id === id);
          post.comments.splice(index, 1);
        }
      });

      //update firestore
      await db.collection("hubs").doc(thisPost.category).update({
        posts: posts,
      });

      //update state of all categories and posts
      const hubs = await db.collection("hubs").get();
      let tempHubs = [];
      hubs.forEach((doc) => {
        tempHubs.push(doc.data());
      });
      setAllCategories(tempHubs);
      updateAllPosts();
      setShowLoad(false);
    } catch (err) {
      setShowLoad(false);
      console.log(err.message);
    }

    // let indexes = getCommentIndexes();
    // //delete comment from database state
    // let tempCategories = allCategories;
    // tempCategories[indexes.categoryIndex].posts[
    //   indexes.postIndex
    // ].comments.splice(indexes.commentIndex, 1);
    // let tempPosts = tempCategories[indexes.categoryIndex].posts;
    // setAllCategories(tempCategories);
  };

  const confirmDeleteComment = () => {
    if (window.confirm("Delete this comment?")) handleDeleteComment();
  };

  const handleEditChange = (e) => {
    setNewComment(e.target.value);
  };

  const toggleShowEdit = () => {
    setShowEdit(!showEdit);
    setNewComment(text);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (newComment === "" || newComment === text) {
      toggleShowEdit();
      return;
    }

    try {
      setShowLoad(true);
      //get posts from firestore
      let doc = await db.collection("hubs").doc(thisPost.category).get();
      let posts = doc.data().posts;
      //edit the comment
      posts.forEach((post) => {
        if (post.id === thisPost.id) {
          let index = post.comments.findIndex((comment) => comment.id === id);
          post.comments[index].text = newComment;
        }
      });

      //update firestore
      await db.collection("hubs").doc(thisPost.category).update({
        posts: posts,
      });

      //update state of all categories and posts
      const hubs = await db.collection("hubs").get();
      let tempHubs = [];
      hubs.forEach((doc) => {
        tempHubs.push(doc.data());
      });
      setAllCategories(tempHubs);
      updateAllPosts();
      setShowLoad(false);
    } catch (err) {
      setShowLoad(false);
      console.log(err.message);
    }

    // let indexes = getCommentIndexes();
    // //edit comment from database
    // arrCategories[indexes.categoryIndex].posts[indexes.postIndex].comments[
    //   indexes.commentIndex
    // ].text = newComment;
    // //update posts
    // updateAllPosts();
    // //update database state
    // setAllCategories(arrCategories);
  };

  return (
    <div className="Comment">
      <Link to={`/profile/${user}`} className="link">
        <span>{user}</span>
      </Link>

      <div className="text-container">
        <p className="comment-text">{text}</p>
        <div className="btn-container">
          {currentUser.username === user && (
            <button className="btn btn-show-edit" onClick={toggleShowEdit}>
              <i className="fas fa-edit"></i>
            </button>
          )}
          {currentUser.username === user && (
            <button className="btn btn-delete" onClick={confirmDeleteComment}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
      {showEdit && (
        <div className="edit-container">
          <form
            className="comments-form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => handleSubmitEdit(e)}
          >
            <textarea
              id="comment-edit-textarea"
              placeholder="Edit message"
              onChange={(e) => handleEditChange(e)}
              value={newComment}
            ></textarea>
            <button type="submit" className="btn btn-edit">
              Confirm edit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
/***** PARENT COMPONENT *****/
function Comments({
  isLoggedIn,
  allCategories,
  setAllCategories,
  currentUser,
  updateAllPosts,
  setShowLogin,
  setShowLoading
}) {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [thisPost, setThisPost] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [showLoad, setShowLoad] = useState(false);

  //functions

  //handlers
  const handleSubmit = async (e) => {
    //add comment to database

    e.preventDefault();
    if (comment === "") return;

    //find index of category where post belongs
    // let categoryIndex = arrCategories.findIndex(
    //   (category) => category.name === thisPost.category
    // );
    //find index of post from the same category
    // let postIndex = arrCategories[categoryIndex].posts.findIndex(
    //   (post) => post.id === thisPost.id
    // );

    try {
      setShowLoad(true);
      //generate id of comment
      let commentId =
        thisPost.id + "Comment" + Math.floor(Math.random() * 10000);
      //record comment
      let newComment = {
        id: commentId,
        user: currentUser.username,
        text: comment,
      };
      //get current hub posts
      let doc = await db.collection("hubs").doc(thisPost.category).get();
      let posts = doc.data().posts;
      //add new comment
      posts.forEach((post) => {
        if (post.id === thisPost.id) {
          post.comments.unshift(newComment);
        }
      });
      //update hub on firestore
      await db.collection("hubs").doc(thisPost.category).update({
        posts: posts,
      });

      //update state of all categories and posts
      const hubs = await db.collection("hubs").get();
      let tempHubs = [];
      hubs.forEach((doc) => {
        tempHubs.push(doc.data());
      });
      setAllCategories(tempHubs);
      setComment("");
      setShowLoad(false);
    } catch (err) {
      setShowLoad(false);
      console.log(err.message);
    }
    //find index of post from the same category
    // postIndex = hub.posts.findIndex(
    //   (post) => post.id === thisPost.id
    // );
    // hub.posts[postIndex].comments.unshift(newComment);
    /* 
    hub.update({
      posts: editedPosts
    })
    */

    //add the comment using both indices
    // arrCategories[categoryIndex].posts[postIndex].comments.unshift(newComment);
    //update database state
  };

  const handleCommentChange = (e) => {
    //update input state
    setComment(e.target.value);
  };

  //USE EFFECT
  const getPostAndCommentsData = async () => {
    //find the post and its comments from the database and set as state
    try {
      //gets all hubs/categories from firestore and set as state
      let hubs = await db.collection("hubs").get();
      let tempHubs = [];
      hubs.forEach((doc) => {
        tempHubs.push(doc.data());
      });

      //get all posts only
      let tempPosts = [];
      hubs.forEach((doc) => {
        tempPosts = [...tempPosts, ...doc.data().posts];
      });

      //find specific post
      let tempPost = tempPosts.find((post) => {
        return post.id === id;
      });
      //set states
      // setAllCategories(tempHubs);
      setThisPost(tempPost);
      setAllComments(tempPost.comments);
      setShowLoading(false);
    } catch (err) {
      console.log(err.message);
    }

    // arrCategories.map((category) => {
    //   category.posts.map((post) => {
    //     tempPosts.push(post);
    //     return post;
    //   });
    //   return category;
    // });
  };

  useEffect(() => {
    getPostAndCommentsData();
  }, [id]);

  return (
    <>
    {showLoad && (
          <Loading text="Updating database..." />
        )}
    <div className="Comments">
      <div className="posts-container">
        <Post
          key={thisPost.id}
          thisPost={thisPost}
          currentUser={currentUser}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          updateAllPosts={updateAllPosts}
          isLoggedIn={isLoggedIn}
          setShowLogin={setShowLogin}
          setShowLoading={setShowLoading}
        />
        {isLoggedIn && (
          <form
            className="comments-form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => handleSubmit(e)}
          >
            <textarea
              id="comments-textarea"
              placeholder="What are your thoughts?"
              onChange={(e) => handleCommentChange(e)}
              value={comment}
            ></textarea>
            <button type="submit" className="btn btn-comment">
              Post comment
            </button>
          </form>
        )}
        <div className="comments-divider"></div>
        <h2>Comments</h2>
        <div className="comments-container">
          {allComments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                user={comment.user}
                text={comment.text}
                thisPost={thisPost}
                currentUser={currentUser}
                allCategories={allCategories}
                setAllCategories={setAllCategories}
                updateAllPosts={updateAllPosts}
                setShowLoad={setShowLoad}
              />
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}

export default Comments;
