import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import '../../public/stylesheets/Account.css'

const Account = () => { 

const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const handleEditToggle = () => {
    navigate('/account/edit')
  }


  if (!user) {
    return <p>User information not available.</p>
  }


  
  return (
    <div className="fundraising-wrapper">
      <div className="account-container">
        <div className="header-section">
          <div className="settings-btn">
            <Link to="/account/settings">
              <button>Settings</button>
            </Link>
          </div>
          <div className="title-wrapper">
            <div className="fundraiser-badge">
              <i className="fas fa-heart"></i>
            </div>
            <h2>Account Info</h2>
            <p className="platform-tagline">Building communities, changing lives</p>
          </div>
        </div>

        <div className="form-container">
          <div className="input-section">
            <div className="input-row">
              <label>
                <span>First Name:</span>
                <input type="text" value={user.first_name} readOnly />
              </label>
            </div>

            <div className="input-row">
              <label>
                <span>Last Name:</span>
                <input type="text" value={user.last_name} readOnly />
              </label>
            </div>

            <div className="input-row">
              <label>
                <span>Email:</span>
                <input type="email" value={user.email} readOnly />
              </label>
            </div>

            <div className="input-row">
              <label>
                <span>Address:</span>
                <input type="text" value={user.address} readOnly />
              </label>
            </div>

            <div className="input-row">
              <label>
                <span>Phone Number:</span>
                <input type="text" value={user.phone_number} readOnly />
              </label>
            </div>
          </div>

          <div className="action-wrapper">
            <div className="edit-btn">
              <button onClick={() => handleEditToggle()}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account