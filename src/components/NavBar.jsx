import { Link } from "react-router"


const NavBar = () => {
return(
  <>
<Link to='/'>Home</Link>
<Link to='/about'>About Us</Link>
<Link to='/donations'>Donations</Link>
<Link to='/auth/login'>Login</Link>
<Link to='/auth/register'>Register</Link>
  </>
)


}

export default NavBar