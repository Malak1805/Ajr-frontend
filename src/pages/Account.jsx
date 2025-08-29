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
    <div className="account-container">
      <div className="settings-btn">
        <Link to="/account/settings">
          <button>Settings</button>
        </Link>
      </div>
      <h2>Account Info</h2>

      <label>
        <span>First Name:</span>
        <input type="text" value={user.first_name} readOnly />
      </label>

      <label>
        <span>Last Name:</span>
        <input type="text" value={user.last_name} readOnly />
      </label>
      <label>
        <span>Email:</span>
        <input type="email" value={user.email} readOnly />
      </label>

      <label>
        <span>Address:</span>
        <input type="text" value={user.address} readOnly />
      </label>

       <label>
        <span>Phone Number:</span>
        <input type="text" value={user.phone_number} readOnly />
      </label>

     

      <div className="edit-btn">
        <button onClick={() => handleEditToggle()}>Edit Profile</button>
      </div>
    </div>
  )
}

export default Account