import AddPost from "../components/AddPost"
import Posts from "./Posts"
import { Link } from "react-router"
import '../../src/stylesheets/Home.css'

const Home = ({ posts }) => {
  return(
  <>
  <div className="home-header-section">
  <h1 className="home-title">Donation Posts!</h1>
  <Link to='/posts/new' className="create-post-button">
  Create a Donation Post!
  </Link>
  <Posts posts={posts}/>
  </div>
  </>
  )
}

export default Home