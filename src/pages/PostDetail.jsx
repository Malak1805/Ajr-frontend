import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../src/stylesheets/PostDetail.css'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [donationAmount, setDonationAmount] = useState('')
  const [donationMessage, setDonationMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [donationSuccess, setDonationSuccess] = useState(false)
  const [donationError, setDonationError] = useState(null)

  
  const fetchPostDetails = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`http://localhost:3000/posts/${id}`)
      setPost(response.data.post); 
      setLoading(false);
    } catch (err) {
      console.error('Error fetching post details:', err);
      setError('Failed to load post details. Please try again.')
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPostDetails()
  }, [id])

  const handleDonationSubmit = async (e) => {
    e.preventDefault()
    setDonationError(null)
    setDonationSuccess(false)

    if (!donationAmount || Number(donationAmount) <= 0) {
      setDonationError('Please enter a valid donation amount greater than 0.')
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setDonationError('You must be logged in to make a donation.')
        return;
      }


      const response = await axios.post(
        `http://localhost:3000/donations/${post._id}`,
        { amount: Number(donationAmount), message: donationMessage },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

     
      setPost(prevPost => ({
        ...prevPost,
        current_amount: response.data.postAmounts.current_amount
      }));

      setDonationAmount('')
      setDonationMessage('')
      setDonationSuccess(true) 
    } catch (err) {
      console.error('Error making donation:', err.response ? err.response.data : err.message)
      setDonationError(err.response?.data?.msg || 'Failed to make donation.')
    }
  };

  if (loading) {
    return <div>Loading post details...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!post) {
    return (
      <div>
        Post not found!
        <div className="mt-4">
          <Link to="/">
            &larr; Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  const progress = (post.current_amount / post.goal_amount) * 100;

  return (
   <div className='postdetail-container'>
  <div className='postdetails'>
    <h1>{post.title}</h1>
    <p>{post.description}</p>

    <div className='postdonations'>
      <span>Goal: <span>${post.goal_amount.toFixed(2)}</span></span>
      <span>Current: <span>${(post.current_amount || 0).toFixed(2)}</span></span>
    </div>

    {/* Progress Bar */}
    <div className="progress-container">
      <div 
        className="progress-bar"
        style={{ width: `${Math.min(100, progress)}%` }}
      ></div>
    </div>
    <p className="progress-text">{Math.min(100, progress).toFixed(2)}% of goal reached</p>

    <div className="post-author">
      {post.userId ? (
        <span>By: {post.userId.first_name} {post.userId.last_name}</span>
      ) : (
        <span>By: Unknown User</span>
      )}
    </div>

    {/* Donation Form */}
    <div className="donation-section">
      <h2>Make a Donation</h2>
      {donationError && (
        <div className="alert alert-error" role="alert">
          <p>{donationError}</p>
        </div>
      )}
      {donationSuccess && (
        <div className="alert alert-success" role="alert">
          <p>Thank you for your donation! 🎉</p>
        </div>
      )}
      <form onSubmit={handleDonationSubmit} className="donation-form">
        <div className="form-group">
          <label htmlFor="donationAmount">Amount ($)</label>
          <input
            type="number"
            id="donationAmount"
            className="form-input"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            required
            min="1"
            step="0.01"
            placeholder="Enter donation amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="donationMessage">Message (Optional)</label>
          <textarea
            id="donationMessage"
            className="form-textarea"
            value={donationMessage}
            onChange={(e) => setDonationMessage(e.target.value)}
            rows="3"
            placeholder="Leave a message of support (optional)"
          ></textarea>
        </div>
        <button
          type="submit"
          className="donate-btn"
          disabled={!donationAmount || parseFloat(donationAmount) <= 0}
        >
          Donate Now
        </button>
      </form>

      <div className="back-link-container">
        <Link to="/" className="back-link">
          ← Back to all posts
        </Link>
      </div>
    </div>
  </div>
</div>

  )
}
export default PostDetail
