import React, { useState, useEffect } from "react";
import "./HubPage.css";
import { useParams } from "react-router-dom";
import { Post } from "./Main";

function HubPage({ allPosts }) {
  let { category } = useParams();
  const [categoryPosts, setCategoryPosts] = useState([]);

  useEffect(() => {
    //get all posts from same category
    let tempCategoryPosts = allPosts.filter(
      (post) => post.category === category
    );
    setCategoryPosts(tempCategoryPosts);
  }, []);

  return (
    <div className="HubPage">
      <h1>/{category}</h1>
      <div className="hub-posts">
        {categoryPosts.map((post) => {
          return (
            <Post
              key={post.id}
              category={post.category}
              poster={post.poster}
              date={post.date}
              title={post.title}
              text={post.text}
              image={post.image}
              votes={post.votes}
              comments={post.comments}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HubPage;
