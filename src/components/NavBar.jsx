import { Link } from "react-router"
import '../../src/stylesheets/NavBar.css'

const NavBar = () => {
return(
  <>
  <nav className="navbar-container">
<Link to='/' className="nav-link">Home</Link>
<Link to='/about' className="nav-link">About Us</Link>
<Link to='/donations' className="nav-link">Donations</Link>
<Link to='/auth/login' className="nav-link">Login</Link>
<Link to='/auth/register' className="nav-link">Register</Link>
</nav>
  </>
)


}

export default NavBar