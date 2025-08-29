import { useState } from "react";



const Search = ({ onSearch }) => {

 const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

return(

  <>
<div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
          autoComplete="off" 
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  </>
)




}

export default Search