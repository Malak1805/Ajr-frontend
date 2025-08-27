import AddPost from "../components/AddPost"
import Posts from "./Posts"

const Home = ({ posts }) => {
  return(
  <>
  <h1>Donation Posts!</h1>
  <Link to='/posts/new'>
  Create a Donation Post!
  </Link>
  <Posts posts={posts}/>
  
  </>
  )
}

export default Home