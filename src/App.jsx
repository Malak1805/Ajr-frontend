import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import './App.css'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'
import Posts from './pages/Posts'
import AddPost from './components/AddPost'
import PostDetail from './pages/PostDetail'
import EditPost from './components/EditPost'
import Donation from './components/Donation'
import Account from './pages/Account'
import EditAccount from './pages/EditAccount'
import Settings from './pages/Settings'
import UpdatePassword from './pages/UpdatePassword'
import About from './pages/About'
import { useState } from 'react'
import DonationList from './components/DonationList'
import NotAuthorized from './pages/NotAuthorized'
import Client from '../services/Api'
import { useContext } from 'react'
import { BASE_URL } from '../globals'
import { UserContext } from './Context/UserContext'
import { useEffect } from 'react'

function App() {
const [postsUpdated, setPostsUpdated] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user, setUser } = useContext(UserContext) 
  const navigate = useNavigate()

  const onPostChange = () => setPostsUpdated(prev => !prev)

  const getAccount = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const res = await Client.get(`${BASE_URL}/auth/session`)
        setUser(res.data)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error(err)
      localStorage.clear()
      setUser(null)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getAccount()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <>
      <main>
        {/* <h1>Place Your Donations Now!</h1> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home postsUpdated={postsUpdated} />}/>
          <Route path="/posts/new" element={<AddPost onPostChange={onPostChange} />} />
          <Route path="/edit-post/:id" element={<EditPost onPostChange={onPostChange}/>} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/posts/:id" element={<PostDetail onPostChange={onPostChange} />} />
          <Route path="/my-donations" element={<DonationList user={user}/>} />
          <Route path="/posts/:postId/donations" element={<Donation />} />
          <Route path="/account" element={<Account  />} />
          <Route path="/account/edit" element={<EditAccount />} />
          <Route path="/about" element={<About />} />
          <Route path="/account/settings" element={<Settings />} />
          <Route path="/account/password" element={<UpdatePassword />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          <Route path="/auth/login" element={<LoginForm />} />
        </Routes>
      </main>
    </>
  )
}

export default App
