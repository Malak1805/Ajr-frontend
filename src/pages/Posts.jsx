import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router";

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
<div className="grid">
      {posts.map((post) => (
        <div key={post._id}>
          <Link to={`/posts/${post._id}`}></Link>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div className="container-2">
            <span>Goal: ${post.goal_amount}</span>
            <span className="user-info">
              By: {post.userId.first_name} {post.userId.last_name}
            </span>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Posts