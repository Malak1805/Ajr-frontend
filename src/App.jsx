import  { Routes, Route } from 'react-router'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import './App.css'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'
import Posts from './pages/Posts'
import AddPost from './components/AddPost'

function App() {


  return (
    <>
    <main>
      <h1>Place Your Donations Now!</h1>
      <NavBar />
      <Routes>
        <Route path='/' element={<  Home/>} />
        <Route path='/posts/new' element={<AddPost setPosts={setPosts} />} />
        <Route path='/posts/:id' element={<PostDetail posts={posts} />} />
        <Route path='/posts' element={<Posts />} />
         <Route path='/auth/register' element={<RegisterForm />} />
          <Route path='/auth/login' element={<LoginForm />} />
      </Routes>
      </main>
    </>
  )
}

export default App
