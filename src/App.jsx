import  { Routes, Route } from 'react-router'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import './App.css'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginForm'

function App() {


  return (
    <>
    <main>
      <h1>Hello</h1>
      <Routes>
        <Route path='/' element={<  Home/>} />
      </Routes>
      </main>
      <NavBar />
      <RegisterForm />
      <LoginForm />
    </>
  )
}

export default App
