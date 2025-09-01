import { Link } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import { useContext } from "react"
import '../../public/stylesheets/NavBar.css'

const NavBar = () => {
   const { user } = useContext(UserContext) 
return(
  <>
  
  <nav className="navbar-container">
    <img src="..\img\AjrWebsiteLogo.webp" alt="" />
<Link to='/' className="nav-link">Home</Link>
<Link to='/about' className="nav-link">About Us</Link>
<Link to='/my-donations' className="nav-link">My Donations</Link>
 {user ? (
        
          <Link to="/account" className="nav-link">Account</Link>
        ) : (
          <>
            <Link to='/auth/login' className="nav-link">Login</Link>
            <Link to='/auth/register' className="nav-link">Register</Link>
          </>
        )}
</nav>
  </>
)


}

export default NavBar