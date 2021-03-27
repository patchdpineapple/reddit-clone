import React, { useState, useEffect } from "react";
import "./HubPage.css";
import { useParams } from "react-router-dom";
import Main from "./Main";

function HubPage({ allCategories, allPosts, isLoggedIn }) {
  let { category } = useParams();
  

  return (
    <>
      <Main allCategories={allCategories} allPosts={allPosts} isLoggedIn={isLoggedIn} categoryName={category} />
      
    </>
  );
}

export default HubPage;
