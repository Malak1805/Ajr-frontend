
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../globals'
import '../../public/stylesheets/AddPost.css'

const AddPost = ({ onPostChange }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [goalAmount, setGoalAmount] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)
  
const handleAddPost = async (e) => {
  e.preventDefault()
  setError(null)

  if (!title || !description || !goalAmount || !category) {
    setError("Please fill in all required fields.")
    return
  }

  const token = localStorage.getItem("token")
  if (!token) {
    setError("You must be logged in to create a post.")
    return
  }

  try {
    // created a formData to send text and image together, using append allowing sending images and files
    const data = new FormData()
    data.append("title", title)
    data.append("description", description)
    data.append("goal_amount", goalAmount)
    data.append("category", category)

    if (image) {
      data.append("image", image)
    }

    await axios.post(`${BASE_URL}/posts`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    onPostChange()
    navigate("/")
  } catch (err) {
    console.error("Failed to add post:", err.response ? err.response.data : err.message)
    setError(err.response?.data?.msg || "Something went wrong.")
  }
}



  return (
    <>
<div className="create-post-page">
  <div className="create-post-wrapper">
    <h1 className="create-post-title">Create a New Post</h1>
    <form onSubmit={handleAddPost} className="create-post-form">
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
        ></textarea>
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
            <label htmlFor="category">Category</label>
            <select id="category" value={category}
              onChange={(e) => setCategory(e.target.value)} required>
              <option value="">-- Select Category --</option>
              <option value="Medical & Health">Medical & Health</option>
              <option value="Education">Education</option>
              <option value="Disaster Relief">Disaster Relief</option>
              <option value="Community & Social Causes">Community & Social Causes</option>
              <option value="Children & Orphans">Children & Orphans</option>
              <option value="Animal Welfare">Animal Welfare</option>
              <option value="Environmental Causes">Environmental Causes</option>
              <option value="Religious & Charity">Religious & Charity</option>
            </select>
          </div>

          <div className="form-group">
  <label htmlFor="image">Upload Image</label>
  <input 
    type="file" 
    accept="image/*" 
    onChange={(e) => setImage(e.target.files[0])} 
  />
</div>

      <div className="form-actions">
        <button type="submit">✨ Create Post</button>
      </div>
    </form>
  </div>
</div>
    </>
  )
}

export default AddPost
