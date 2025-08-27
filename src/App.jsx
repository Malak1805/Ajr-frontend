import { useState } from 'react'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <h1>Hello</h1>
      <Routes>
        <Route path='/' element={<  Home/>} />
      </Routes>
      </main>
      <NavBar />
    </>
  )
}

export default App
