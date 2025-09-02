import { useState } from "react";
import '../../public/stylesheets/Search.css'


const Search = ({ onSearch }) => {

  const handleChange = (e) => {

    const term = e.target.value

    if (onSearch) onSearch(term) // sends term 
  }

return(

  <>
<div className="searchbar-wrapper">
  <div className="searchbar-container">
    
      <input
        type="text"
        name="searchTerm"
        placeholder="Search posts..."
        onChange={handleChange}
        className="searchbar-input"
        autoComplete="off"
      />
      <button type="submit" className="searchbar-button">
        Search
      </button>

  </div>
</div>
  </>
)




}

export default Search