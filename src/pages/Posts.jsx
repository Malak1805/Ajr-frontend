import { useState } from "react"
import { useEffect } from "react"

const Posts = () => {
  const staticPosts = [
    {
      _id: '1',
      title: 'Help Fund School Supplies for Orphan Students',
      description: 'We are raising funds to provide essential school supplies to underprivileged children in our community. Your contribution will help them succeed in their studies.',
      goal_amount: 1500,
      userId: {
        first_name: 'Amal',
        last_name: 'Center'
      }
    },
    {
      _id: '2',
      title: 'Support a Local Animal Shelter',
      description: 'Our animal shelter is in urgent need of funds to cover food, medical care, and facility maintenance for stray and rescued animals. Every donation counts.',
      goal_amount: 5000,
      userId: {
        first_name: 'Safe',
        last_name: 'Haven'
      }
    },
    {
      _id: '3',
      title: 'Medical Aid for A single father',
      description: 'A local family is facing a medical crisis and needs financial assistance to cover hospital bills and treatment costs. Let\'s show our support.',
      goal_amount: 10000,
      userId: {
        first_name: 'Peter',
        last_name: 'Jones'
      }
    }
  ];

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/posts')
        setPosts(res.data)
      } catch (err) {
        console.error('Failed to fetch posts:', err)
        setError('Failed to load posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

   if (loading) {
    return (
      <div>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div>
        <p>No posts available at the moment.</p>
      </div>
    )
  }

  
  return(
    <>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div className="container-2">
            <span>Goal: ${post.goal_amount}</span>
            <span className="user-info">
              By: {post.userId.first_name} {post.userId.last_name}
            </span>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Posts