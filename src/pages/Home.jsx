import AddPost from '../components/AddPost'
import Posts from './Posts'
import { Link } from 'react-router'
import '../../public/stylesheets/Home.css'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Home = ({ postsUpdated }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)



  const fetchAllPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3000/posts')
  
      setPosts(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts.')
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchAllPosts()
  }, [postsUpdated]) 

  if (loading) return <div className="loading-message">Loading posts...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
    <>
      <div className="home-header-section">
        <h1 className="home-title">Donation Posts!</h1>
        <Link to="/posts/new" className="create-post-button">
          Create a Donation Post!
        </Link>
        <Posts posts={posts} />
      </div>
    </>
  )
}

export default Home
