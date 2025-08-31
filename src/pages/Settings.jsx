import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import '../../public/stylesheets/Settings.css'

const Settings = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)


  const handleLogOut = () => {
        setUser(null)
        localStorage.clear()
        navigate('/auth/login')
    }

return(
  <>
  <div className="back-btn">
        <button onClick={() => navigate(-1)}>back</button>
      </div>
      <h1 className='settings-heading'>Settings</h1>

      <div className="settings-section">
        <h2>Account Options</h2>
        <div className="settings-options">
          <Link to="/account">
            <button className="settings-button">Account Info</button>
          </Link>

          <Link to="/account/password">
            <button className="settings-button">Change Password</button>
          </Link>
          <button onClick={handleLogOut} className="settings-button">
            Log Out
          </button>
        </div>
      </div>
  </>
)

}

export default Settings