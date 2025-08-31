
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import Client from '../../services/Api'
import '../../public/stylesheets/EditAccount.css'
const EditAccount = () => {


const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()


  const [userDetails, setUserDetails] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    address: user?.address || '',
    phone_number: user?.phone_number || ''
  })

  if (!user) {
    return <p>Loading account details for editing...</p>
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await Client.put(`/auth/profile`, userDetails)
      setUser(res.data.updatedProfile)
      navigate('/account')
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await Client.delete('/auth/profile')
      setUser(null)
      localStorage.clear()
      navigate('/auth/register')
    } catch (error) {
      console.error('Failed to delete account:', error)
    }
  };

  return (
    <div className="fundraising-wrapper">
      <div className="account-container">
        
        
        <div className="header-section">
          <div className="back-btn">
            <button onClick={() => navigate(-1)}>⬅ Back</button>
          </div>
          <div className="title-wrapper">
            <div className="fundraiser-badge">👤</div>
            <h2>Edit Account Info</h2>
            <p className="platform-tagline">Update your details to keep your account fresh ✨</p>
          </div>
        </div>

        
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-section">

              <div className="input-row">
                <label>
                  <span>First Name:</span>
                  <input
                    type="text"
                    name="first_name"
                    value={userDetails.first_name}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="input-row">
                <label>
                  <span>Last Name:</span>
                  <input
                    type="text"
                    name="last_name"
                    value={userDetails.last_name}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="input-row">
                <label>
                  <span>Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="input-row">
                <label>
                  <span>Address:</span>
                  <input
                    type="text"
                    name="address"
                    value={userDetails.address}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="input-row">
                <label>
                  <span>Phone Number:</span>
                  <input
                    type="tel"
                    name="phone_number"
                    value={userDetails.phone_number}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

          
            <div className="action-wrapper">
              <div className="edit-btn">
                <button type="submit">Update Account Details</button>
              </div>
              <div className="edit-btn delete-btn" style={{ marginTop: "1.5rem" }}>
                <button type="button" onClick={handleDeleteAccount}>
                  Delete Account ❌
                </button>
              </div>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  )
}

export default EditAccount