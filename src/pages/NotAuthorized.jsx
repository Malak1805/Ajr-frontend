import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>🚫 You are not authorized to view this page</h1>
      <p>
        <Link to="/">← Back to all posts</Link>
      </p>
    </div>
  )
}

export default NotAuthorized;