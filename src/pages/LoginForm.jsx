import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../src/stylesheets/LoginForm.css'

export const LoginUser = async (data) => {
  try {
    const res = await axios.post(`http://localhost:3000/auth/login`, data)

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
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    try {
      const response = await LoginUser(formValues)

      if (response && response.token) {
        localStorage.setItem('token', response.token)

        navigate('/')
      } else {
        setMessage('Login failed. Please check your credentials.')
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || 'An unexpected error occurred.'
      setMessage(errorMessage)
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
  }
  }
  return (
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
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="login-submit" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
   
  )
}

export default LoginForm
