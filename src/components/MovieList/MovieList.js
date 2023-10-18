import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import supabase from '../../api/supabaseClient';
export default function Movielist({  }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  useEffect(() => {
    supabase.from('movies').select('*').then((res) => {
      const data = res.data.slice(0, 20);
      console.log(data);
      setMovies(data);
      setLoading(false);
    });
  }, []);

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < 5) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const displayedMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-10">Popular Movies</h1>
      <div className="grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-5 gap-4 px-8 md:px-16 lg:px-32">
        {displayedMovies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={() => handlePageChange('prev')}>Previous</button>
        <span className="mx-4">{currentPage}</span>
        <button onClick={() => handlePageChange('next')}>Next</button>
      </div>
    </>
  );
}
