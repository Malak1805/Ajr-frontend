import { Routes, Route } from 'react-router-dom'
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

function App() {

const [postsUpdated, setPostsUpdated] = useState(false)
  const onPostChange = () => setPostsUpdated(prev => !prev)

  return (
    <>
      <main>
        <h1>Place Your Donations Now!</h1>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home postsUpdated={postsUpdated} />}/>
          <Route path="/posts/new" element={<AddPost onPostChange={onPostChange} />} />
          <Route path="/edit-post/:id" element={<EditPost onPostChange={onPostChange}/>} />
          <Route path="/posts/:id" element={<PostDetail onPostChange={onPostChange} />} />
          
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/auth/login" element={<LoginForm />} />
        </Routes>
      </main>
    </>
  )
}

export default App
