import { useState } from "react";
import '../../public/stylesheets/Search.css'


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
<div className="searchbar-wrapper">
  <div className="searchbar-container">
    <form onSubmit={handleSubmit} className="searchbar-form">
      <input
        type="text"
        name="searchTerm"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleChange}
        className="searchbar-input"
        autoComplete="off"
      />
      <button type="submit" className="searchbar-button">
        Search
      </button>
    </form>
  </div>
</div>
  </>
)




}

export default Search