import React, { useState, useEffect } from "react";
import "./HubPage.css";
import { useParams } from "react-router-dom";
import Main from "./Main";

function HubPage({
  allCategories,
  allPosts,
  isLoggedIn,
  setShowMakePost,
  currentCategory,
  setCurrentCategory,
  setShowNewHub,
  categoryPosts,
  setCategoryPosts,
  currentUser,
  setAllCategories,
  updateAllPosts,
}) {
  let { category } = useParams();
  useEffect(() => {
    setCurrentCategory(category);
  }, [category]);

  return (
    <>
      <Main
        allCategories={allCategories}
        allPosts={allPosts}
        isLoggedIn={isLoggedIn}
        setShowMakePost={setShowMakePost}
        setShowNewHub={setShowNewHub}
        categoryName={currentCategory}
        categoryPosts={categoryPosts}
        setCategoryPosts={setCategoryPosts}
        currentUser={currentUser}
        setAllCategories={setAllCategories}
        updateAllPosts={updateAllPosts}
      />
    </>
  );
}

export default HubPage;
