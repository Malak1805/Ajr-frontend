import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import '../../src/stylesheets/Posts.css'

const Posts = ({ posts }) => {
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