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
  setCurrentPost,
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
        categoryName={currentCategory}
        setCurrentPost={setCurrentPost}
      />
    </>
  );
}

export default HubPage;
