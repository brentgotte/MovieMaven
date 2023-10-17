import React, { useState } from 'react';

const SearchBar = ({ onSearch, searchResults }) => {
  const [query, setQuery] = useState('');

  const results = Array.isArray(searchResults) ? searchResults.slice(0, 3) : [];

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="relative z-10">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleInputChange}
        className="bg-white border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      {results.length > 0 && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20">
          <ul>
            {results.map((movie) => (
              <li key={movie.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-10 h-10 mr-2"
                />
                {movie.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
