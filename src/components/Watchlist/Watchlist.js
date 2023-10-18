import Link from 'next/link';
import React, { useState } from 'react';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';

export default function watchlist({ movies }) {
  const [activeChunk, setActiveChunk] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const chunkSize = 4;
  const animationDuration = 300; // in milliseconds

  const handlePrev = () => {
    if (activeChunk > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveChunk(activeChunk - 1);
        setIsAnimating(false);
      }, animationDuration);
    }
  };

  const handleNext = () => {
    if (activeChunk < Math.ceil(movies.length / chunkSize) - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveChunk(activeChunk + 1);
        setIsAnimating(false);
      }, animationDuration);
    }
  };

  const displayedMovies = Array.isArray(movies) ? movies.slice(activeChunk * chunkSize, (activeChunk + 1) * chunkSize) : [];

  return (
    <>
     
      <div id="default-carousel" className={`relative w-full overflow-hidden  rounded-md flex space-x-4 justify-center transition-opacity duration-${animationDuration} ${isAnimating ? 'opacity-0' : 'opacity-100' }`}>      
        {displayedMovies.map((movie) => (
          <div key={movie.movie_id} className="w-52 h-72 shadow-lg mb-12 " >
             <div className='hover:opacity-25'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.movies.poster_path}`} className="w-full h-full object-cover  " alt={movie.movies.title}/> 
            <p>{movie.movies.title}</p>
            </div>
            
          </div>
        ))}
        
        <button type="button" className="absolute top-1/2 left-40 z-30 flex items-center justify-center w-10 h-10 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full cursor-pointer group focus:outline-none transform -translate-y-1/2" onClick={handlePrev}>
          <MdSkipPrevious/>
        </button>

        <button type="button" className="absolute top-1/2 right-40 z-30 flex items-center justify-center w-10 h-10 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full cursor-pointer group focus:outline-none transform -translate-y-1/2" onClick={handleNext}>
          <MdSkipNext/>
        </button>
        <Link href='/mylist'>
        <p className='underline'> View all</p> 
        </Link>
      </div>
    </>
  );
}
