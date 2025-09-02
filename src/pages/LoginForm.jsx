import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../public/stylesheets/LoginForm.css'
import { BASE_URL } from '../../globals'

export const LoginUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, data)

    console.log('Login successful:', res.data)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)

    throw error
  }
}

const LoginForm = () => {
  const navigate = useNavigate()

  const initialState = {
    email: '',
    password: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const [message, setMessage] = useState('')
   const [messageType, setMessageType] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setMessageType('')
    try {
      const response = await LoginUser(formValues)

      if (response && response.token) { //checks weather response exist and if it has a token
        localStorage.setItem('token', response.token) //stores

        navigate('/')
      } else {
        setMessage('Login failed. Please check your credentials.')
         setMessageType('error')
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || 'An unexpected error occurred.'
      setMessage(errorMessage)
      setMessageType('error')
      console.error('Login failed:', error)
    } 
      setIsLoading(false)
  }
  return (
<div className="login-container">
  <div className="login-form-wrapper">
    <h1>Log In to Your Account</h1>
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          onChange={handleChange}
          value={formValues.email}
          required
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formValues.password}
          required
        />
      </div>
      
      <button 
        type="submit" 
        className={`login-submit ${isLoading ? 'loading' : ''}`}
      >
        {/* Log In */}
      </button>
    </form>
    
    
    <div className="forgot-password">
      <a href="/forgot-password">Forgot your password?</a>
    </div>
    
    {message && (
      <div className={`message ${messageType === 'error' ? 'error' : 'success'}`}>
        {message}
      </div>
    )}
  </div>
</div>
   
  )
}

export default LoginForm