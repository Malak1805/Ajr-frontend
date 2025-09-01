import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../public/stylesheets/RegisterForm.css'
import { BASE_URL } from '../../globals'

export const RegisterUser = async (data, user) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/register?user=${user}`,
      data
    )
    return res.data
  } catch (error) {
    console.error('Error during registration:', error)
    throw error
  }
}

const RegisterForm = () => {
  const navigate = useNavigate()

  const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    address: '',
    phone_number: '',
    country: ''
  }

  const [formValues, setFormValues] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = { ...formValues }
      delete userData.confirm_password

      await RegisterUser(userData, 'customer')

      setFormValues(initialState)
      navigate('/auth/login')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const isPasswordValid =
    formValues.password.length >= 8 &&
    formValues.password === formValues.confirm_password
  const isFormFilled =
    formValues.first_name.length > 0 &&
    formValues.last_name.length > 0 &&
    formValues.email.length > 0 &&
    formValues.address.length > 0 &&
    isPasswordValid

  return (
    <div className="Register-Container">
      <h1>Create a user account</h1>
      <div className="user-register">
        <form onSubmit={handleSubmit}>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            value={formValues.first_name}
            required
            autoComplete="given-name"
          />

          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            value={formValues.last_name}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formValues.email}
            required
            autoComplete="email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formValues.password}
            required
            autoComplete="new-password"
          />

          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formValues.confirm_password}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder="street 123"
            onChange={handleChange}
            value={formValues.address}
          />

          <label htmlFor="phone_number">Phone Number</label>
<input
  type="tel" 
  name="phone_number"
  placeholder="Phone Number (Optional)"
  onChange={handleChange}
  value={formValues.phoneNumber}
/>

<label htmlFor="country">Country</label>
<input
  type="text"
  name="country"
  placeholder="Country"
  onChange={handleChange}
  value={formValues.country}
/>

          <p>Passwords must match and be at least 8 characters long.</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>
            By creating an account you agree to the
            <br />
            <a className="privacy" href="/privacy">
              Privacy Policy
            </a>
            . and{' '}
            <a className="terms" href="/terms">
              terms of use
            </a>{' '}
          </p>

          <button
            className={`register-submit ${isLoading ? 'loading' : ''}`}
            disabled={!isFormFilled || isLoading}
            type="submit"
          >
            {isLoading ? 'Registering...' : 'Create Your Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
