import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom";

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
  <div>
      {posts.map((post) => (
        <div key={post._id}>
          <Link to={`/posts/${post._id}`} className="block">
            <h2>{post.title}</h2>
            <p>{post.description}</p> 
            <div>
              <span>Goal: <span>${post.goal_amount}</span></span>
              <span>
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
  
    </>
  )
}

export default Posts