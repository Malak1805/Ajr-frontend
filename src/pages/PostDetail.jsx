
import Posts from "./Posts";
  
  const PostDetail = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(p => p._id === id);

  if (!post) {
    return <div className="text">Post not found!</div>
  }

  return (
    <>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        
          <span>Goal: <span>${post.goal_amount}</span></span>
          <span>By: {post.userId.first_name} {post.userId.last_name}</span>
        
        
          <Link to="/">
            &larr; Back to all posts
          </Link>
</>
  )
}





