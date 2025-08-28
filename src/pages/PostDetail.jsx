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
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(true)
  const [commentError, setCommentError] = useState(null)
  const [newCommentMessage, setNewCommentMessage] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [commentSubmissionError, setCommentSubmissionError] = useState(null)
  const [commentSubmissionSuccess, setCommentSubmissionSuccess] =
    useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)

  const BASE_API_URL = 'http://localhost:3000'

  const fetchPostDetails = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`http://localhost:3000/posts/${id}`)
      setPost(response.data.post)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching post details:', err)
      setError('Failed to load post details. Please try again.')
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    setLoadingComments(true)
    setCommentError(null)
    try {
      const token = localStorage.getItem('token')

      const response = await axios.get(`http://localhost:3000/comments/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      })
      setComments(response.data.comments)
    } catch (err) {
      console.error('Error fetching comments:', err)
      setCommentError(err.response?.data?.msg || 'Failed to load comments.')
    } finally {
      setLoadingComments(false)
    }
  }

  useEffect(() => {
    fetchPostDetails()
 const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUserId(payload.id);
    } catch (e) {
      console.error("Error decoding token:", e);
      setCurrentUserId(null); 
    }
  }

  if (id) {
    fetchComments();
  }
}, [id, commentSubmissionSuccess]);



  const handleDonationSubmit = async (e) => {
    e.preventDefault()
    setDonationError(null)
    setDonationSuccess(false)

    if (!donationAmount || Number(donationAmount) <= 0) {
      setDonationError('Please enter a valid donation amount greater than 0.')
      return
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setDonationError('You must be logged in to make a donation.')
        return
      }

      const response = await axios.post(
        `http://localhost:3000/donations/${post._id}`,
        { amount: Number(donationAmount), message: donationMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setPost((prevPost) => ({
        ...prevPost,
        current_amount: response.data.postAmounts.current_amount
      }))

      setDonationAmount('')
      setDonationMessage('')
      setDonationSuccess(true)
    } catch (err) {
      console.error(
        'Error making donation:',
        err.response ? err.response.data : err.message
      )
      setDonationError(err.response?.data?.msg || 'Failed to make donation.')
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    setSubmittingComment(true)
    setCommentSubmissionError(null)
    setCommentSubmissionSuccess(false)

    if (!newCommentMessage.trim()) {
      setCommentSubmissionError('Comment cannot be empty.')
      setSubmittingComment(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setCommentSubmissionError('You must be logged in to leave a comment.')
        setSubmittingComment(false)
        return
      }
      const response = await axios.post(
        `${BASE_API_URL}/comments/${id}`,
        { message: newCommentMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setCommentSubmissionSuccess(true)
      setNewCommentMessage('')
    } catch (err) {
      console.error(
        'Comment submission error:',
        err.response ? err.response.data : err.message
      )
      setCommentSubmissionError(
        err.response?.data?.msg ||
          'An unexpected error occurred while adding comment.'
      )
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('You must be logged in to delete a comment.')
        return
      }

      await axios.delete(`${BASE_API_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) 

      setComments(comments.filter((comment) => comment._id !== commentId))
    } catch (err) {
      console.error('Error deleting comment:', err)
      alert('Failed to delete comment. Please try again.')
    }
  }

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
          <Link to="/">&larr; Back to all posts</Link>
        </div>
      </div>
    )
  }

  const progress = (post.current_amount / post.goal_amount) * 100

  return (
    <div className="postdetail-container">
      <div className="postdetails">
        <h1>{post.title}</h1>
        <p>{post.description}</p>

        <div className="postdonations">
          <span>
            Goal: <span>${post.goal_amount.toFixed(2)}</span>
          </span>

          <span>
            {' '}
            Current: <span>${(post.current_amount || 0).toFixed(2)}</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${Math.min(100, progress)}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {Math.min(100, progress).toFixed(2)}% of goal reached
        </p>

        <div className="post-author">
          {post.userId ? (
            <span>
              By: {post.userId.first_name} {post.userId.last_name}
            </span>
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
              <label htmlFor="donationAmount"> Amount ($)</label>
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
          </form>{/* Comment Form */}
          <div className="comments-section">
            <h2>Comments ({comments.length})</h2>

            {loadingComments && (
              <p className="comments-loading">Loading comments...</p>
            )}
            {commentError && <p className="comments-error">{commentError}</p>}

            {!loadingComments && comments.length === 0 && (
              <p className="no-comments-message">
                No comments yet. Be the first to leave a message!
              </p>
            )}

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                  <p className="comment-message">{comment.message}</p>
                  <div className="comment-meta">
                    <span className="comment-author">
                      By:{' '}
                      {comment.userId
                        ? `${comment.userId.first_name} ${comment.userId.last_name}`
                        : 'Unknown User'}
                    </span>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
      {comment.userId && comment.userId._id === currentUserId && (
        <button
          onClick={() => handleDeleteComment(comment._id)}
          className="delete-comment-btn"
        >
          Delete
        </button>
        )}
                </div>
              ))}
            </div>

            <div className="add-comment-form">
              <h3>Leave a Comment</h3>
              {commentSubmissionError && (
                <div className="alert alert-error" role="alert">
                  <p>{commentSubmissionError}</p>
                </div>
              )}
              {commentSubmissionSuccess && (
                <div className="alert alert-success" role="alert">
                  <p>Comment added successfully! 👍</p>
                </div>
              )}
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <div className="form-group">
                  <label htmlFor="newCommentMessage">Your Comment</label>
                  <textarea
                    id="newCommentMessage"
                    className="form-textarea"
                    value={newCommentMessage}
                    onChange={(e) => setNewCommentMessage(e.target.value)}
                    rows="4"
                    placeholder="Share your thoughts or support..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="comment-submit-btn"
                  disabled={submittingComment || !newCommentMessage.trim()}
                >
                  {submittingComment ? 'Posting Comment...' : 'Post Comment'}
                </button>
              </form>
            </div>
          </div>
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
