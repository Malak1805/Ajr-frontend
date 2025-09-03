import { Link } from "react-router"
import '../../public/stylesheets/About.css'
const About = () => {
return(
  <>
 <div className="about-container">
       
        <div className="floating-hearts">💖</div>
        <div className="floating-hands">🤝</div>
        
        <div className="about-content">
         
          <div className="back-link-container">
            <Link to="/" className="back-link">
              ← Back to Home
            </Link>
          </div>

          
          <h1 className="about-heading">🌟 About AJR</h1>

          
          <p className="about-paragraph">
            At AJR, we are redefining the way people connect through giving. Designed for individuals and communities facing financial challenges, AJR provides a modern, user-friendly fundraising platform that makes the process of requesting and offering support simple, secure, and transparent.
          </p>

          <p className="about-paragraph">
            Every feature of AJR is built to provide a smooth and intuitive experience. From clean navigation to clear progress tracking, the platform encourages trust, empathy, and community engagement, making it easier than ever to make a meaningful impact.
          </p>

          
          <div className="features-section">
            <h2 className="section-heading">💡 What Sets Us Apart</h2>
            
            <ul className="features-list">
              <li className="feature-item">
                <strong>Optimized Interface:</strong>
                <p className="feature-description">
                  A friendly and accessible design ensures users of all backgrounds can navigate with ease.
                </p>
              </li>
              
              <li className="feature-item">
                <strong>Secure Transactions:</strong>
                <p className="feature-description">
                  Donations are handled safely with full transparency.
                </p>
              </li>
              
              <li className="feature-item">
                <strong>Interactive Community:</strong>
                <p className="feature-description">
                  Supportive comments and engagement tools foster encouragement around each campaign post.
                </p>
              </li>
              
              <li className="feature-item">
                <strong>Personal Dashboards:</strong>
                <p className="feature-description">
                  Donors and recipients can manage campaigns posts, track donations, and monitor progress in real time.
                </p>
              </li>
            </ul>
          </div>

          
          <div className="vision-mission-section">
            <h2 className="section-heading">🌍 Our Vision</h2>
            <div className="vision-content">
              <p>
                To create a seamless bridge between generosity and need, where technology enhances human connection and makes fundraising truly accessible.
              </p>
            </div>
          </div>

         
          <div className="vision-mission-section">
            <h2 className="section-heading">🤝 Our Mission</h2>
            <div className="mission-content">
              <p>
                Empowering individuals and communities facing financial hardships by providing a digital platform that combines ease of use, transparency, and trust to drive meaningful, lasting impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
 
)
}

export default About