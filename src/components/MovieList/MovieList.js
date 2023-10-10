import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
export default function Movielist() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  useEffect(() => {
    const fetchMovies = async () => {
      let fetchedMovies = [];
      for (let i = 1; i <= 5; i++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=bdeba0f284b7d753826f7cb651d9cb90&language=en-US&page=${i}`
        );
        const data = await response.json();
        fetchedMovies = fetchedMovies.concat(data.results);
      }
      setMovies(fetchedMovies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < 5) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
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
      <h1 className="text-3xl font-bold text-center mt-10 mb-4">All movies</h1>
            <h1 className='text-3xl font-bold text-center mt-10 mb-4'>All Movies</h1>
            <div className='grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-5 gap-4 px-8 md:px-16 lg:px-32'>
                {displayedMovies.map(movie => (
                    <div key={movie.id}> 
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <button onClick={() => handlePageChange("prev")}>Previous</button>
                <span className="mx-4">{currentPage}</span>
                <button onClick={() => handlePageChange("next")}>Next</button>
            </div>
        </>
    );   
}

