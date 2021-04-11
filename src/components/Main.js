import React, { useState, useEffect } from "react";
import "./Main.css";
import { Link } from "react-router-dom";
import arrCategories from "../data/categories";
import { db } from "../firebase/config";

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

function Category({ id, name, members, image }) {
  return (
    <div className="Category" data-id={id}>
      <div className="category-info">
        <img className="category-img" src={image} alt="" />
        <div className="category-text-container">
          <Link to={`/hub/${name}`} className="link">
            <strong className="category-title">/{name}</strong>
          </Link>
          <span className="category-members">{members} members</span>
        </div>
      </div>
      <button className="btn btn-join">Join</button>
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
      setShowLoading(true);
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
      setShowLoading(false);
    } catch (err) {
      setShowLoading(false);
      console.log(err.message);
      alert(err.message);
    }
  };

  const getPostIndexes = () => {
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
  };

  const vote = async (choice) => {
    //get post and voter indexes for updating database
    let indexes = getPostIndexes();
    //find if current user voted on this post
    // let voterIndex = arrCategories[indexes.categoryIndex].posts[
    //   indexes.postIndex
    // ].voters.findIndex((voter) => voter.username === currentUser.username);

    try {
      //get post data from db
      // let doc = await db.collection("hubs").doc(thisPost.category).get();
      // let posts = doc.data().posts;
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
      //update state of all categories and posts
      // const hubs = await db.collection("hubs").get();
      // let tempHubs = [];
      // hubs.forEach((doc) => {
      //   tempHubs.push(doc.data());
      // });
      setAllCategories(tempAllCategories);
      updateAllPosts();
    } catch (err) {
      console.log(err.message);
    }
  };

  //handlers
  const handleVote = (choice) => {
    if (isLoggedIn) {
      vote(choice);
    } else setShowLogin(true);
  };

  const handleDeletePost = () => {
    deletePostFromFirestore();
  };

  const confirmDeletePost = () => {
    if (window.confirm("Delete this post?")) handleDeletePost();
  };

  //USE EFFECT
  const checkUserVote = () => {
    //update votes button state if the user already voted or not
    let indexes = getPostIndexes();
    if (!indexes) return;

    //find if current user voted on this post
    let voter = allCategories[indexes.categoryIndex].posts[
      indexes.postIndex
    ].voters.find((voter) => voter.username === currentUser.username);

    voter ? setUserVote(voter.vote) : setUserVote("");
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (thisPost) {
        let indexes = getPostIndexes();
        if (!indexes) return;

        //find if current user voted on this post
        console.log("posts", allCategories);
        if(allCategories[indexes.categoryIndex].posts[
          indexes.postIndex
        ]){
          let voter = allCategories[indexes.categoryIndex].posts[
          indexes.postIndex
        ].voters.find((voter) => voter.username === currentUser.username);

        voter ? setUserVote(voter.vote) : setUserVote("");

        }
        
      }
    }
  }, [isLoggedIn, thisPost, allCategories]);

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
            <img className="post-img" src={thisPost.image} alt="" />
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
    if (categoryName) {
      let categoryIndex = allCategories.findIndex(
        (category) => category.name === categoryName
      );
      setCategoryPosts(allCategories[categoryIndex].posts);
    } else {
      setCategoryPosts(allPosts);
    }
  }, [allCategories, categoryName]);

  return (
    <div className="Main container">
      <div className="current-category">
        <h1>{categoryName ? `/${categoryName}` : "/All"}</h1>
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
