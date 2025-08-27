import Posts from '../pages/Posts'
import { useState } from 'react'
import Home from '../pages/Home'
import { useNavigate } from 'react-router'
import axios from 'axios'

const AddPost = ({ setPosts }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [goalAmount, setGoalAmount] = useState('')
  const [error, setError] = useState(null);
  
   const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        title: title,
        description: description,
        goal_amount: Number(goalAmount),
      };


      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to create a post.');
        return;
      }


      const response = await axios.post(
        'http://localhost:3000/posts', 
        newPost,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )


      const createdPost = response.data;

      setPosts((prevPosts) => [createdPost, ...prevPosts]);


      navigate('/posts');
    } catch (err) {
      console.error('Failed to add post:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.msg : 'An unexpected error occurred.');
    }
  };

  return (
    <>
      <div>
        <div>
          <h1>Create a New Post</h1>
          <form onSubmit={handleAddPost}>
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
