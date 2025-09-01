import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../public/stylesheets/DonationList.css'
import { BASE_URL } from '../../globals'


const DonationList = ({ user }) => {
  const [donatedPosts, setDonatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDonatedPosts = async () => {
      const token = localStorage.getItem('token')
      if (!token || !user) {
        setError('You must be logged in to view your donations.')
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`${BASE_URL}/donations/my-donations`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setDonatedPosts(response.data.donations)
      } catch (err) {
        console.error("Error fetching user's donated posts:", err)
        setError('Failed to load your donations.')
      } finally {
        setLoading(false)
      }
    }

    fetchDonatedPosts()
  }, [user])

  if (loading) return <div className="loading-message">Loading your donations...</div>
  if (error) return <div className="error-message">{error}</div>

  return (
      <div className="donations-page">
    <h1>
      {user?.first_name
        ? <>
            <span className="user-name">{user.first_name}</span>'s Donation List!
          </>
        : 'Donation List!'}
    </h1>

    {donatedPosts.length === 0 ? (
      <div className="empty-state">
        <h3>No Donations Yet</h3>
        <p>You haven't made any donations yet. Start supporting a post today!</p>
      </div>
    ) : (
      <>
        <div className="donations-grid">
          {donatedPosts.map((post) => (
            <div key={post._id} className="donation-card">
              <Link to={`/posts/${post._id}`} className="donation-link">
                <h2 className="donation-title">{post.title || 'Untitled Post'}</h2>
                <div className="underline"></div>
                <p className="donation-description">
                  {post.description ? post.description.substring(0, 100) : 'No description available'}...
                </p>
              </Link>

              <div className="donation-progress-container">
                <div
                  className="donation-progress-bar"
                  style={{
                    width: post.goal_amount
                      ? `${Math.min((post.current_amount / post.goal_amount) * 100, 100)}%`
                      : '0%',
                  }}
                ></div>
              </div>

              <div className="donation-meta">
                <div className="donation-goal">
                  Goal: <span>${post.goal_amount || 0}</span>
                </div>
                <div className="donation-author">{post.user?.username || 'Anonymous'}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    )}

    <div className="particle-background"></div>
  </div>
  )
}

export default DonationList
