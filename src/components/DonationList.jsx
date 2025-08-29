import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../public/stylesheets/DonationList.css'

const DonationList = () => {
    const [donatedPosts, setDonatedPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDonatedPosts = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    setError('You must be logged in to view your donations.')
                    setLoading(false)
                    return
                }
                const response = await axios.get('http://localhost:3000/donations/my-donations', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setDonatedPosts(response.data.donatedPosts)
            } catch (err) {
                console.error("Error fetching user's donated posts:", err)
                setError('Failed to load your donations.')
            } finally {
                setLoading(false)
            }
        }

        fetchDonatedPosts()
    }, [])

    if (loading) return <div className="loading-message">Loading your donations...</div>
    if (error) return <div className="error-message">{error}</div>

    return (
<div className="donations-page">
  <h1>Posts I've Donated To</h1>

  {donatedPosts.length === 0 ? (
    <div className="empty-state">
      <h3>No Donations Yet</h3>
      <p>You haven't made any donations yet. Start supporting a post today!</p>
    </div>
  ) : (
    <div className="donations-grid">
      {donatedPosts.map((post) => (
        <div key={post._id} className="donation-card">
          <Link to={`/posts/${post._id}`} className="donation-link">
            <h2 className="donation-title">{post.title}</h2>
            <div className="underline"></div>
            <p className="donation-description">{post.description.substring(0, 100)}...</p>
          </Link>

          {/* Progress Bar */}
          <div className="donation-progress-container">
            <div
              className="donation-progress-bar"
              style={{ width: `${(post.current_amount / post.goal_amount) * 100}%` }}
            ></div>
          </div>
          <div className="donation-meta">
            <div className="donation-goal">
              Goal: <span>${post.goal_amount}</span>
            </div>
            <div className="donation-author">{post.user?.username || 'Anonymous'}</div>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* Particle container */}
  <div className="particle-background"></div>
</div>
    )
}

export default DonationList