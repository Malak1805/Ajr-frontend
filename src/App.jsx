import  { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import './App.css'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'
import Posts from './pages/Posts'
import AddPost from './components/AddPost'
import PostDetail from './pages/PostDetail'
import EditPost from './components/EditPost'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  const [posts, setPosts] = useState([])
  const [loadingApp, setLoadingApp] = useState(true)
  const [errorApp, setErrorApp] = useState(null)

  
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoadingApp(true);
      
        const response = await axios.get('http://localhost:3000/posts')
        setPosts(response.data)
        setErrorApp(null);
      } catch (err) {
        console.error('Error fetching all posts in App.jsx:', err)
        setErrorApp('Failed to load initial posts.')
      } finally {
        setLoadingApp(false)
      }
    }

    fetchAllPosts()
  }, []) 

  if (loadingApp) {
    return (
      <div>
        <p>Loading application data...</p>
      </div>
    );
  }

  if (errorApp) {
    return (
      <div>
        <p>{errorApp}</p>
      </div>
    )
  }

  return (
    <>
    <main>
      <h1>Place Your Donations Now!</h1>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home posts={posts}/>} />
        <Route path='/posts/new' element={<AddPost setPosts={setPosts} />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path='/posts/:id' element={<PostDetail posts={posts} />} />
        <Route path='/posts' element={<Posts posts={posts} />} />
        <Route path='/auth/register' element={<RegisterForm />} />
        <Route path='/auth/login' element={<LoginForm />} />
      </Routes>
      </main>
    </>
  )
}

export default App
