import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import Client from '../../services/Api'

const UpdatePassword = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [formValues, setFormValues] = useState({
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    setErrorMessage('') 
    setSuccessMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValues.new_password !== formValues.confirm_new_password) {
      setErrorMessage('New passwords do not match.')
      return;
    }
    
 
    if (formValues.new_password.length < 8) {
      setErrorMessage('New password must be at least 8 characters long.')
      return
    }

    try {
      const payload = {
        old_password: formValues.old_password,
        new_password: formValues.new_password
      }
      

      await Client.put(`/auth/password`, payload)

      setSuccessMessage('Password updated successfully!')
      setErrorMessage('')

      setFormValues({
        old_password: '',
        new_password: '',
        confirm_new_password: ''
      })
      

      setTimeout(() => {
        navigate('/account')
      }, 2000) 

    } catch (error) {
      console.error('Password update failed:', error)
      const msg = error.response?.data?.msg || 'Failed to update password. Please check your old password.'
      setErrorMessage(msg)
      setSuccessMessage('')
    }
  }

  return (
    <div className="update-password-container">
      <div className="back-btn">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Current Password:</span>
          <input
            type="password"
            name="old_password"
            value={formValues.old_password}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          <span>New Password:</span>
          <input
            type="password"
            name="new_password"
            value={formValues.new_password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Confirm New Password:</span>
          <input
            type="password"
            name="confirm_new_password"
            value={formValues.confirm_new_password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </label>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        
        <button type="submit">Update Password</button>
      </form>
    </div>
  )
}

export default UpdatePassword