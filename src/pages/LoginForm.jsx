import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
    }
  }

  return (
    <div>
      <div>
        <h1>Log In to Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div>
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
          <div>
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
          <button type="submit">Log In</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default LoginForm
