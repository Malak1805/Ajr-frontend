import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../../public/stylesheets/Donations.css'
import { BASE_URL } from '../../globals'

const Donation = () => {

  const { postId } = useParams()
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true)

        const response = await axios.get(`${BASE_URL}/donations/${postId}`)
        
 
        setDonations(response.data.donations)
        setError(null);
      } catch (err) {
        console.error('Error fetching donations:', err)
        setError('Failed to load donations.')
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchDonations()
    }
  }, [postId])

  if (loading) return <div className="loading-message">Loading donations...</div>
  if (error) return <div className="error-message">{error}</div>

return(

  <>
 <div className="donations-page">
      <div className="particle-background"></div>

      <h1>💸 Donations for Post</h1>

      {donations.length === 0 ? (
        <div className="empty-state">
          <h3>No Donations Yet</h3>
          <p>
            This post hasn’t received any donations yet. Be the first to support
            this cause and make a difference. 🌟
          </p>
        </div>
      ) : (
        <div className="donations-grid">
          {donations.map((donation, index) => (
            <div key={donation._id} className="donation-card">
              <h4 className="donation-title">Donation #{index + 1}</h4>
              <div className="underline"></div>

              <p className="donation-description">
                Amount: <strong>${donation.amount}</strong>
              </p>

              <div className="donation-meta">
                <span className="donation-goal">
                  Donated by{" "}
                  <span>
                    {donation.user?.first_name} {donation.user?.last_name}
                  </span>
                </span>
                <span className="donation-author">🙏 Supporter</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
)




}

export default Donation