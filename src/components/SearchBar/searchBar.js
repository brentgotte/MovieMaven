"use client"
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import supabase from "../../api/supabaseClient";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter(); 
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [matchingMoviesCount, setMatchingMoviesCount] = useState([]);

  // Ref for the search bar component
  const searchBarRef = useRef(null);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowResults(newQuery.trim().length > 0);
  };

  // Function to close the dropdown when clicked outside
  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 0) {
        setLoading(true);
      // Fetch the count of all movies that match the query
      const { data, count, error } = await supabase
        .from('movies')
        .select('*', { count: 'exact' })
        .ilike('title', `%${query}%`);
      if (error) {
        console.error('error', error);
      } else {
        setSearchResults(data.slice(0, 3));
        setTotalResults(count || 0);
      }
      setLoading(false);
    } else {
      setSearchResults([]);
      setTotalResults(0);
      setShowResults(false); // Hide results when query is empty
    }
  };

  fetchResults();
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

  const handleMovieClick = () => {
    setQuery('');
    setShowResults(false);
  };  

  const handleMatchingMoviesClick = () => {
    // Navigate to the Movies component with the search query as a query parameter
    if(query.trim() !== '') {
      router.push(`/searchResult/${encodeURIComponent(query)}`);
    }
  };
  
  return (
    <div ref={searchBarRef} className="relative z-10">
      <input
        id="search-bar"
        type="text"
        place-holder="Search movies..."
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
            id="movie-result-count"
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
}
export default SearchBar