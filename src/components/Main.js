import React, {useState, useEffect} from "react";
import "./Main.css";
import { Link, useParams, useRouteMatch } from "react-router-dom";

function PostFloater({setShowMakePost}) {
  const handleMakePost = () => {
    setShowMakePost(true);
  }

  return (
    <div className="PostFloater">
      <button className="btn btn-post-floater" onClick={handleMakePost}><i className="fas fa-plus"></i></button>
      </div>
  );
}

function Category({ id, name, members, image }) {
  let {path, url} = useRouteMatch();


  return (
    <div className="Category" data-id={id}>
      <div className="category-info">
        <img className="category-img" src={image} alt="" />
        <div className="category-text-container">
          <Link to={url === "/" ? `hub/${name}`: `/hub/${name}`} className="link"><strong className="category-title">/{name}</strong></Link>
          <span className="category-members">{members} members</span>
        </div>
      </div>
      <button className="btn btn-join">Join</button>
    </div>
  );
}

function Post({ id, category, poster, date, title, text, image, votes, comments, allPosts, setCurrentPost }) {

  let {path, url} = useRouteMatch();

  const handleSelectPost = () => {
    //finds the post with same id as selected post and sets as current post to be displayed on the post page
    let tempCurrentPost = allPosts.find( post => post.id === id);
    setCurrentPost(tempCurrentPost);
  }

  return (
    <div className="Post" data-id={id}>
      <div className="container votes-container">
        <button className="btn btn-vote btn-upvote">
          <i className="fas fa-chevron-up"></i>
        </button>
        <p className="votes">{votes}</p>
        <button className="btn btn-vote btn-downvote">
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
      <div className="container post-content-container">
        <div className="post-header">
        <Link to={url === "/" ? `hub/${category}`: `/hub/${category}`} className="link"><strong className="post-group">/{category}</strong></Link>
          <p className="post-postedBy">posted by <span className="post-user">{poster}</span></p>
          <p className="post-time">{date}</p>
        </div>
        <div className="post-main">
        <Link to={url === "/" ? `post/${id}`: `/post/${id}`} className="link" onClick={handleSelectPost}><h3 className="post-title">{title}</h3></Link>
          <p className="post-message">{text}</p>
          <div className="post-img-container">
            <img className="post-img" src={image} alt="" />
          </div>
          <div className="post-comment-container">
            <div className="post-comment">
              <i
                className="fas fa-comment-alt"
                style={{ "fontSize": "12px" }}
              ></i>
              <Link to={url === "/" ? `post/${id}`: `/post/${id}`} className="link" onClick={handleSelectPost}><span className="post-comment-text">{comments} Comments</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Main({allCategories, allPosts, isLoggedIn, setShowMakePost, categoryName, setCurrentPost}) {
  
  const [categoryPosts, setCategoryPosts] = useState([]);
console.log(categoryName);
  useEffect(() => {
    
    //get posts from same category only or all posts if no category name
    if(categoryName){
      let tempCategoryPosts = allPosts.filter(
        (post) => post.category === categoryName
      );
      setCategoryPosts(tempCategoryPosts);
    } else setCategoryPosts(allPosts);
    
  }, [categoryName]);

  return (
    <div className="Main container">
      <div className="current-category">
  <h1>{categoryName ? categoryName:"/All"}</h1>
      </div>
      <div className="posts-container container">
        {categoryPosts.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              category={post.category}
              poster={post.poster}
              date={post.date}
              title={post.title}
              text={post.text}
              image={post.image}
              votes={post.votes}
              comments={post.comments}
              allPosts={allPosts}
              setCurrentPost={setCurrentPost}
            />
          );
        })}
      </div>
      <div className="categories-container container">
        <p className="category-header">Categories</p>
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
        {isLoggedIn && <button className="btn btn-new-category">Add Category</button>}
      </div>
      {isLoggedIn && <PostFloater setShowMakePost={setShowMakePost} />}
    </div>
  );
}

export default Main;
export {Post, PostFloater};