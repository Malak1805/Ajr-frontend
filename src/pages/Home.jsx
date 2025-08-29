
import { Link } from 'react-router'
import '../../public/stylesheets/Home.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../globals'
import Search from '../components/Search'


const Home = ({ postsUpdated }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  



  const fetchPosts = async () => {
    try {
      const url = searchTerm
        ? `${BASE_URL}/posts?search=${searchTerm}`
        : `${BASE_URL}/posts`

  const response = await axios.get(url)
      setPosts(response.data.posts || response.data || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts.')
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchPosts()
  }, [postsUpdated, searchTerm]) 

   const handleSearch = (term) => {
    setSearchTerm(term)
  }

  if (loading) return <div className="loading-message">Loading posts...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="home-container"> 
      <div className="home-header-section">
        <h1 className="home-title">Donation Posts!</h1>
        <Link to="/posts/new" className="create-post-button">
          Create a Donation Post!
        </Link>
      </div>

      <Search onSearch={handleSearch} />

      {posts.length === 0 ? (
        <p className="no-posts-message posts-empty">No posts found.</p> 
      ) : (
        <div className="posts-list-container"> 
          <div className="posts-list"> 
            {posts.map((post) => (
              <div key={post._id} className="post-item"> 
                <Link to={`/posts/${post._id}`} className="post-link"> 
                  <h2 className="post-title"> 
                    {post.title}
                  </h2>
                  <p className="post-description">{post.description}</p> 
                  <div className="post-meta"> 
                    <span className="post-goal"> 
                        Goal: <span>${post.goal_amount.toFixed(2)}</span>
                    </span>
                    <span className="post-current">
                      Current: ${(post.current_amount || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="post-author"> 
                    By: {post.userId ? `${post.userId.first_name} ${post.userId.last_name}` : 'Unknown User'}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
