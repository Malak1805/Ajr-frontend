import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


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
        <div className="my-donations-container">
            <h1>Posts I've Donated To</h1>
            {donatedPosts.length === 0 ? (
                <p>You haven't made any donations yet.</p>
            ) : (
                <div className="posts-grid">
                    {donatedPosts.map(post => (
                        <div key={post._id} className="post-card">
                            <h2>{post.title}</h2>
                            <p>{post.description.substring(0, 100)}...</p>
                            <Link to={`/posts/${post._id}`} className="view-post-link">
                                <button>View Post</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DonationList