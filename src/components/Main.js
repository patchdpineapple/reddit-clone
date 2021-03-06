import React, { useState, useEffect, useCallback } from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import { db, storage } from "../firebase/config";

function PostFloater({ setShowMakePost }) {
  const handleMakePost = () => {
    setShowMakePost(true);
  };

  return (
    <div className="PostFloater">
      <button className="btn btn-post-floater" onClick={handleMakePost}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}

function Category({
  id,
  name,
  members,
  image,
  currentUser,
  setShowLoading,
  setAllCategories,
  updateAllPosts,
}) {
  const deleteHubFromFirestore = async () => {
    try {
      setShowLoading(true);

      //delete hub
      await db.collection("hubs").doc(id).delete();
      //update state of all categories and posts
      const hubs = await db.collection("hubs").get();
      let tempHubs = [];
      hubs.forEach((doc) => {
        tempHubs.push(doc.data());
      });
      setAllCategories(tempHubs);
      await updateAllPosts();

      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      alert(err.message);
    }
  };
  const handleDeleteHub = () => {
    if (currentUser.username === "patchdpineapple") {
      if (window.confirm("Delete hub?")) deleteHubFromFirestore();
    }
  };

  return (
    <div className="Category" data-id={id}>
      <div className="category-info">
        <img
          className="category-img"
          src={
            image ||
            "https://firebasestorage.googleapis.com/v0/b/thehub-reddit-clone.appspot.com/o/placeholders%2Fhubplaceholder2.png?alt=media&token=09a2d7f5-ecf9-4211-ba91-6f7b56393b8c"
          }
          alt=""
        />
        <div className="category-text-container">
          <Link to={`/hub/${name}`} className="link">
            <strong className="category-title">/{name}</strong>
          </Link>
          <span className="category-members">{members} members</span>
        </div>
      </div>
      {currentUser.username === "patchdpineapple" && (
        <button className="btn btn-del" onClick={handleDeleteHub}>
        Del
      </button>
      )}
    </div>
  );
}

function Post({
  thisPost,
  currentUser,
  allCategories,
  setAllCategories,
  updateAllPosts,
  showDelete,
  isLoggedIn,
  setShowLogin,
  setShowLoading,
}) {
  const [userVote, setUserVote] = useState(""); // upvote/downvote/""

  //functions
  const deletePostFromFirestore = async () => {
    //delete the post from firestore database and update states
    try {
      //get posts from database
      let doc = await db.collection("hubs").doc(thisPost.category).get();
      //record posts and remove the post with filter
      let tempPosts = doc.data().posts;
      let filteredPosts = tempPosts.filter((post) => post.id !== thisPost.id);
      //update database with filtered posts
      await db.collection("hubs").doc(thisPost.category).update({
        posts: filteredPosts,
      });
      //update state of all categories and posts
      const hubs = await db.collection("hubs").get();
      let tempHubs = [];
      hubs.forEach((doc) => {
        tempHubs.push(doc.data());
      });
      setAllCategories(tempHubs);
      await updateAllPosts();
    } catch (err) {
      setShowLoading(false);
      alert(err.message);
    }
  };

  const getPostIndexes = useCallback(() => {
    //returns the database indexes of this post
    //find category index
    let categoryIndex = allCategories.findIndex(
      (category) => category.name === thisPost.category
    );
    if (categoryIndex === -1) return;
    //find post index
    let postIndex = allCategories[categoryIndex].posts.findIndex(
      (post) => post.id === thisPost.id
    );

    return {
      categoryIndex: categoryIndex,
      postIndex: postIndex,
    };
  }, [allCategories, thisPost.category, thisPost.id]);

  const vote = async (choice) => {
    //get post and voter indexes for updating database
    let indexes = getPostIndexes();
    //find if current user voted on this post
    try {
      //get post data from db
      let posts = allCategories[indexes.categoryIndex].posts;

      //get current votes
      let newVotes = thisPost.votes;

      if (userVote === "") {
        choice === "upvote" ? newVotes++ : newVotes--;
        //create new voter based on current user
        let newVoter = {
          username: currentUser.username,
          vote: choice,
        };
        //add new voter, update votes
        posts.forEach((post) => {
          if (post.id === thisPost.id) {
            post.voters.push(newVoter);
            post.votes = newVotes;
          }
        });
      } else if (userVote === choice) {
        if (choice === "upvote") newVotes--;
        else newVotes++;
        //remove voter, update votes
        posts.forEach((post) => {
          if (post.id === thisPost.id) {
            let index = post.voters.findIndex(
              (voter) => voter.username === currentUser.username
            );
            post.voters.splice(index, 1);
            post.votes = newVotes;
          }
        });
      } else if (userVote !== choice) {
        if (choice === "upvote") newVotes += 2;
        else newVotes -= 2;
        //edit voter choice, update votes
        posts.forEach((post) => {
          if (post.id === thisPost.id) {
            let index = post.voters.findIndex(
              (voter) => voter.username === currentUser.username
            );
            post.voters[index].vote = choice;
            post.votes = newVotes;
          }
        });
      }
      //update state
      let tempAllCategories = allCategories;
      tempAllCategories[indexes.categoryIndex].posts = posts;
      //update firestore
      await db.collection("hubs").doc(thisPost.category).update({
        posts: posts,
      });

      setAllCategories(tempAllCategories);
      updateAllPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  //handlers
  const handleVote = (choice) => {
    if (isLoggedIn) {
      vote(choice);
    } else setShowLogin(true);
  };

  const handleDeletePost = async () => {
    try {
      setShowLoading(true);
      //delete image from storage then delete post from firestore
      if (thisPost.imageURL !== "") {
        let storageRef = storage.ref(
          `postImages/${thisPost.id}/${thisPost.image}`
        );
        await storageRef.delete();
        await deletePostFromFirestore();
        setShowLoading(false);
      } else {
        await deletePostFromFirestore();
        setShowLoading(false);
      }
    } catch (err) {
      setShowLoading(false);
      alert(err.message);
    }
  };

  const confirmDeletePost = () => {
    if (window.confirm("Delete this post?")) handleDeletePost();
  };

  //USE EFFECT
  useEffect(() => {
    if (isLoggedIn) {
      if (thisPost) {
        let indexes = getPostIndexes();
        if (!indexes) return;

        //find if current user voted on this post
        if (allCategories[indexes.categoryIndex].posts[indexes.postIndex]) {
          let voter = allCategories[indexes.categoryIndex].posts[
            indexes.postIndex
          ].voters.find((voter) => voter.username === currentUser.username);

          voter ? setUserVote(voter.vote) : setUserVote("");
        }
      }
    }
  }, [
    isLoggedIn,
    thisPost,
    allCategories,
    getPostIndexes,
    currentUser.username,
  ]);

  return (
    <div className="Post" data-id={thisPost.id}>
      <div className="container votes-container">
        <button
          className={`btn btn-vote ${
            userVote === "upvote" ? "btn-upvote" : ""
          }`}
          onClick={() => {
            handleVote("upvote");
          }}
        >
          <i className="fas fa-chevron-up"></i>
        </button>
        <p className="votes">{thisPost.votes}</p>
        <button
          className={`btn btn-vote ${
            userVote === "downvote" ? "btn-downvote" : ""
          }`}
          onClick={() => {
            handleVote("downvote");
          }}
        >
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
      <div className="container post-content-container">
        <div className="post-header">
          <Link to={`/hub/${thisPost.category}`} className="link">
            <strong className="post-group">/{thisPost.category}</strong>
          </Link>

          <p className="post-postedBy">
            posted by{" "}
            <Link to={`/profile/${thisPost.poster}`} className="link">
              <span className="post-user">{thisPost.poster}</span>
            </Link>
          </p>

          <p className="post-time">
            {thisPost.date}
            <span style={{ marginLeft: 8, color: "#1d1d1d80" }}>
              {thisPost.time}
            </span>
          </p>
          {!showDelete
            ? ""
            : !currentUser
            ? ""
            : currentUser.username === thisPost.poster && (
                <button
                  className="btn btn-delete-post"
                  onClick={confirmDeletePost}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
        </div>
        <div className="post-main">
          <Link to={`/post/${thisPost.id}`} className="link">
            <h3 className="post-title">{thisPost.title}</h3>
          </Link>
          <p className="post-message">{thisPost.text}</p>
          <div className="post-img-container">
            <img className="post-img" src={thisPost.imageURL} alt="" />
          </div>
          <div className="post-comment-container">
            <div className="post-comment">
              <i
                className="fas fa-comment-alt"
                style={{ fontSize: "12px" }}
              ></i>
              <Link to={`/post/${thisPost.id}`} className="link">
                <span className="post-comment-text">{`${
                  thisPost.comments ? thisPost.comments.length : ""
                } Comments`}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/***** PARENT COMPONENT *****/
function Main({
  allCategories,
  allPosts,
  isLoggedIn,
  setShowMakePost,
  setShowNewHub,
  categoryName,
  categoryPosts,
  setCategoryPosts,
  currentUser,
  setAllCategories,
  updateAllPosts,
  setShowLogin,
  setShowLoading,
}) {
  const handleNewHub = () => {
    setShowNewHub(true);
  };

  //USE EFFECT
  useEffect(() => {
    //get posts from same category only or all posts if no category name
    if (categoryName && allCategories.length > 0) {
      let categoryIndex = allCategories.findIndex(
        (category) => category.name === categoryName
      );
      setCategoryPosts(allCategories[categoryIndex].posts);
    } else {
      setCategoryPosts(allPosts);
    }
  }, [allCategories, allPosts, categoryName, setCategoryPosts]);

  return (
    <div className="Main container">
      <div className="current-category">
        <h2>{categoryName ? `/${categoryName}` : "/All"}</h2>
      </div>
      <div className="posts-container container">
        {categoryPosts.map((post) => {
          return (
            <Post
              key={post.id}
              thisPost={post}
              currentUser={currentUser}
              allCategories={allCategories}
              setAllCategories={setAllCategories}
              updateAllPosts={updateAllPosts}
              isLoggedIn={isLoggedIn}
              setShowLogin={setShowLogin}
              setShowLoading={setShowLoading}
            />
          );
        })}
      </div>
      <div className="categories-container container">
        <p className="category-header">Hubs</p>
        {allCategories.map((category) => {
          return (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
              members={category.members}
              image={category.image}
              currentUser={currentUser}
              setShowLoading={setShowLoading}
              setAllCategories={setAllCategories}
              updateAllPosts={updateAllPosts}
            />
          );
        })}
        {isLoggedIn && (
          <button className="btn btn-new-category" onClick={handleNewHub}>
            New
          </button>
        )}
      </div>
      {isLoggedIn && <PostFloater setShowMakePost={setShowMakePost} />}
    </div>
  );
}

export default Main;
export { Post, PostFloater };
