import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
// import '../../public/stylesheets/Donations.css'



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
 <div className="donations-container">
      <h2>Donations for Post</h2>
      {donations.length === 0 ? (
        <p>No donations have been made for this post yet.</p>
      ) : (
        <ul className="donations-list">
          {donations.map((donation) => (
            <li key={donation._id} className="donation-item">
              <p>Amount: ${donation.amount}</p>
              <p>Donated by: {donation.user?.first_name} {donation.user?.last_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  </>
)




}

export default Donation