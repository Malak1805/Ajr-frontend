import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import '../../public/stylesheets/Posts.css'

const categories = ['Medical & Health', 'Education', 'Disaster Relief', 'Community & Social Causes', 'Children & Orphans', 'Animal Welfare', 'Religious & Charity']

const Posts = ({ posts = [], category, setCategory }) => {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }
if (posts.length === 0) {
    return (
      <div className="post-container">
        <p>No posts available at the moment.</p>
      </div>
    );
  }
 
  
  return(
    <>
<div className="posts-list-container">
  <div className="posts-filter-container">
        <label htmlFor="category-select">Filter by Category:</label>
        <select id="category-select" onChange={handleCategoryChange} value={category}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
  <div className="posts-list">
    {posts.map((post) => (
      <div key={post._id} className="post-item">
        <Link to={`/posts/${post._id}`} className="post-link">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-description">{post.description}</p>
          
          <div className="post-meta">
            <span className="post-goal">
              Goal: <span>${post.goal_amount}</span>
            </span>
            <span className="post-author">
              {post.userId ? (
                `By: ${post.userId.first_name} ${post.userId.last_name}`
              ) : (
                `By: Unknown User`
              )}
            </span>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
  
    </>
  )
}

export default Posts