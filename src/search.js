import React, { useState } from "react";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    performSearch(value);
  };

  const performSearch = async (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    setSearching(true);

    try {
      const apiKey = "5efaaba96891eead7e6e71ddd40fb5bf";
      const flickrEndpoint = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&safe_search=1&text=${query}&page=1`;
      const response = await fetch(flickrEndpoint);
      const data = await response.json();

      if (data && data.photos && data.photos.photo) {
        setSearchResults(data.photos.photo);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      {searching && <div>Searching...</div>}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
