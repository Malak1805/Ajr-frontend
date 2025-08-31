import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import Client from '../../services/Api'
import '../../public/stylesheets/UpdatePassword.css'

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
 <div className="update-password-page">
      <div className="update-password-container">
        <div className="header-section">
          <div className="back-btn">
            <button onClick={() => navigate(-1)}>
              <i className="fas fa-arrow-left"></i>
              <span>Back</span>
            </button>
          </div>
          <div className="title-section">
            <div className="security-badge">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h2>Change Password</h2>
            <p className="security-subtitle">Keep your account secure with a strong password</p>
          </div>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="password-form">
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">
                  <i className="fas fa-key"></i>
                  Current Password:
                </span>
                <div className="input-wrapper">
                  <input
                    type="password"
                    name="old_password"
                    value={formValues.old_password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your current password"
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-text">
                  <i className="fas fa-lock"></i>
                  New Password:
                </span>
                <div className="input-wrapper">
                  <input
                    type="password"
                    name="new_password"
                    value={formValues.new_password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter a strong new password"
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-text">
                  <i className="fas fa-check-circle"></i>
                  Confirm New Password:
                </span>
                <div className="input-wrapper">
                  <input
                    type="password"
                    name="confirm_new_password"
                    value={formValues.confirm_new_password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Confirm your new password"
                    required
                    autoComplete="new-password"
                  />
                  <div className="input-border"></div>
                </div>
              </label>
            </div>

            <div className="message-section">
              {errorMessage && (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>{errorMessage}</span>
                </div>
              )}
              {successMessage && (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <span>{successMessage}</span>
                </div>
              )}
            </div>

            <div className="submit-section">
              <button type="submit" className="update-password-btn">
                <i className="fas fa-save"></i>
                <span>Update Password</span>
                <div className="btn-shimmer"></div>
              </button>
            </div>
          </form>
        </div>

        <div className="security-tips">
          <h3>Password Security Tips</h3>
          <ul>
            <li><i className="fas fa-check"></i> Use at least 8 characters</li>
            <li><i className="fas fa-check"></i> Include uppercase and lowercase letters</li>
            <li><i className="fas fa-check"></i> Add numbers and special characters</li>
            <li><i className="fas fa-check"></i> Avoid common words or phrases</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword