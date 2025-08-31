import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'


const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [goalAmount, setGoalAmount] = useState('')
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('You are not authorized to edit this post.')
          setLoading(false)
          return
        }

        const response = await axios.get(`http://localhost:3000/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const post = response.data.post
        
      
        setTitle(post.title)
        setDescription(post.description)
        setGoalAmount(post.goal_amount)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching post for edit:', err.response?.data || err.message)
        setError(err.response?.data?.msg || 'Failed to fetch post details for editing.')
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleUpdatePost = async (e) => {
e.preventDefault();
  try {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("goal_amount", Number(goalAmount))
    if (image) formData.append("image", image)

    const token = localStorage.getItem("token")
    await axios.put(`http://localhost:3000/posts/${id}`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })
    navigate(`/posts/${id}`)
  } catch (err) {
    console.error("Failed to update post:", err.response?.data || err.message)
    setError(err.response?.data?.msg || "An unexpected error occurred while updating the post.")
  }
}
  
  if (loading) return <div>Loading post...</div>
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleUpdatePost}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="goalAmount">Goal Amount ($)</label>
          <input
            type="number"
            id="goalAmount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
            min="0"
          />
        </div>
        <div className="form-group">
  <label htmlFor="image">Upload Image</label>
  <input
    type="file"
    id="image"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
  /></div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  )
}

export default EditPost