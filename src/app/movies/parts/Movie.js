'use client'
import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import supabase from "@/api/supabaseClient";

export default function Movielist() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  useEffect(() => {
    supabase.from('movies').select('*').then((res) => {
      const data = res.data;
      setMovies(data);
      setLoading(false);
    });

  }, []);

  
  const totalPages = Math.ceil(movies.length / moviesPerPage);

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle the "Previous" button click
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  return (
    <>
      <h1 className='text-3xl font-bold text-center mb-10'>All Movies</h1>
      <div className='grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-5 gap-4 px-8 md:px-16 lg:px-32'>
        {currentMovies.map(movie => (
          <div key={movie.id}> 
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      
      {/* Pagination buttons */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevClick}
          className={`px-3 py-2 mx-2 ${
            currentPage === 1 ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white'
          }`}
        >
          Previous
        </button>
        <span className="px-3 py-2 mx-2 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextClick}
          className={`px-3 py-2 mx-2 ${
            currentPage === totalPages ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}
