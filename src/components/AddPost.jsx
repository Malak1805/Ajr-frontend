import Posts from '../pages/Posts'
import { useState } from 'react'
import Home from '../pages/Home'
import { useNavigate } from 'react-router'

const AddPost = ({ setPosts }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [goalAmount, setGoalAmount] = useState('')

const handlePostSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      _id: `temp-${Date.now()}`,
      title: title,
      description: description,
      goal_amount: parseInt(goalAmount, 10),
      userId: {
        first_name: 'New',
        last_name: 'User'
      }
    }

    setPosts(prevPosts => [...prevPosts, newPost])

    setTitle('')
    setDescription('')
    setGoalAmount('')

    navigate('/')
  }

  return (
    <>
      <div>
        <div>
          <h1>Create a New Post</h1>
          <form onSubmit={handlePostSubmit}>
            <div className="adding-post-container">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-6">
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
            <div className="text-center">
              <button type="submit">Create Post</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddPost
