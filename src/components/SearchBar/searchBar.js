'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import supabase from "../../api/supabaseClient";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      // Fetch the count of all movies that match the query
      const { data, count, error } = await supabase
        .from('movies')
        .select('*', { count: 'exact' })
        .ilike('title', `%${query}%`);

      if (error) {
        console.error('error', error);
      } else {
        setSearchResults(data.slice(0, 3)); // Show only the first three results
        setTotalResults(count || 0); // Set the total count of matching results
      }
      setLoading(false);
    };

    if (query.length > 0) {
      fetchResults();
    } else {
      setSearchResults([]);
      setTotalResults(0);
    }
  }, [query]);

  useEffect(() => {
    const fetchMatchingMoviesCount = async () => {
      if (query.trim() === '') {
        setMatchingMoviesCount(0);
      } else {
        const { data, error } = await supabase
          .from('movies')
          .select('count', { count: 'exact' })
          .ilike('title', `%${query}%`);

        if (!error) {
          setMatchingMoviesCount(data[0].count);
        }
      }
    };

    fetchMatchingMoviesCount();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const handleMovieClick = () => {
    setQuery('');
    setShowResults(false);
  };

  const handleMatchingMoviesClick = () => {
    // Navigate to the search results page with the search query as a query parameter
    router.push(`/search?query=${encodeURIComponent(query)}`);
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
      {showResults && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20">
          <ul>
            {searchResults.map((movie) => (
              <li
                key={movie.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={handleMovieClick}
              >
                <Link href={`/movie/${movie.id}`}>
                  <p className="cursor-pointer flex items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-10 h-10 mr-2"
                    />
                    {movie.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <p
            onClick={handleMatchingMoviesClick} // Make the count clickable
            className="cursor-pointer text-blue-600"
          >
            View movies: {matchingMoviesCount}
          </p>
        </div>
      )}
      {loading && <div className="absolute mt-1 w-full">Loading...</div>}
    </div>
  );
};

export default SearchBar;
