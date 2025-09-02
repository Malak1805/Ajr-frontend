
import { Link } from 'react-router-dom'
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
      const response = await axios.get(`${BASE_URL}/posts`) // fetch all posts
      setPosts(response.data.posts || response.data || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts.')
    } finally {
      setLoading(false)
    }
  }

  // Only fetching posts when postsUpdated changes, implemented search is client-side
  useEffect(() => {
    fetchPosts()
  }, [postsUpdated])

  // Filtering posts based on search term client-side
  const filteredPosts = posts.filter(post => {
    const term = searchTerm.toLowerCase()
    return (
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term) ||
      (post.category && post.category.toLowerCase().includes(term))
    )
  })

  // grouped posts by category after filtering
  const groupedPosts = filteredPosts.reduce((groups, post) => {
    const category = post.category || 'Uncategorized'
    if (!groups[category]) groups[category] = []
    groups[category].push(post)
    return groups
  }, {})

  return (
      <div className="home-container">
      <div className="home-header-section">
        <h1 className="home-title">Donation Posts!</h1>
        <Link to="/posts/new" className="create-post-button">
          Create a Donation Post!
        </Link>
      </div>

      <Search onSearch={setSearchTerm} />

      {Object.keys(groupedPosts).length === 0 ? (
        <p className="no-posts-message posts-empty">No posts found.</p>
      ) : (
        Object.keys(groupedPosts).map((category) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="posts-list">
              {groupedPosts[category].map((post) => (
                <div key={post._id} className="post-item">
                  <Link to={`/posts/${post._id}`} className="post-link">
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-description">{post.description}</p>
                    <div className="post-meta">
                      <span className="post-goal">
                        Goal: <span>${post.goal_amount.toFixed(2)}</span>
                      </span>
                      <span className="post-current">
                        Current: ${(post.current_amount || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="post-category">
                      Category: {post.category || 'Uncategorized'}
                    </div>
                    <div className="post-author">
                      By:{' '}
                      {post.userId
                        ? `${post.userId.first_name} ${post.userId.last_name}`
                        : 'Unknown User'}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Home
