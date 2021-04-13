import React, { useEffect } from "react";
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
  setShowLogin
}) {
  let { category } = useParams();
  useEffect(() => {
    setCurrentCategory(category);
  }, [category, setCurrentCategory]);

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
        setShowLogin={setShowLogin}
      />
    </>
  );
}

export default HubPage;
