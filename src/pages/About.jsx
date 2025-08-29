import { Link } from "react-router"

const About = () => {
return(
  <>
<div className="about-container">
      <div className="back-link-container">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
      <h1 className="about-heading">🌟 About AJR</h1>
      <p>
        At AJR, we are redefining the way people connect through giving. Designed for individuals and communities facing financial challenges, AJR provides a modern, user-friendly fundraising platform that makes the process of requesting and offering support simple, secure, and transparent.
      </p>
      <p>
        Every feature of AJR is built to provide a smooth and intuitive experience. From clean navigation to clear progress tracking, the platform encourages trust, empathy, and community engagement, making it easier than ever to make a meaningful impact.
      </p>

      <h2 className="section-heading">💡 What Sets Us Apart</h2>
      <ul>
        <li>
          <strong>Optimized Interface:</strong> A friendly and accessible design ensures users of all backgrounds can navigate with ease.
        </li>
        <li>
          <strong>Secure Transactions:</strong> Donations are handled safely with full transparency.
        </li>
        <li>
          <strong>Interactive Community:</strong> Supportive comments and engagement tools foster encouragement around each campaign.
        </li>
        <li>
          <strong>Personal Dashboards:</strong> Donors and recipients can manage campaigns, track donations, and monitor progress in real time.
        </li>
      </ul>

      <h2 className="section-heading">🌍 Our Vision</h2>
      <p>
        To create a seamless bridge between generosity and need, where technology enhances human connection and makes fundraising truly accessible.
      </p>

      <h2 className="section-heading">🤝 Our Mission</h2>
      <p>
        Empowering individuals and communities facing financial hardships by providing a digital platform that combines ease of use, transparency, and trust to drive meaningful, lasting impact.
      </p>
    </div>
  </>
)
}

export default About