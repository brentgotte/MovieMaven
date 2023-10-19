import React, { useState } from 'react';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
import Link from 'next/link';

export default function Moviecarousel({ movies }) {
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

  const displayedMovies = movies.slice(activeChunk * chunkSize, (activeChunk + 1) * chunkSize);

  return (
    <>

      <div id="default-carousel" className={`relative w-full overflow-hidden rounded-md flex space-x-4 justify-center transition-slide duration-${animationDuration} ${isAnimating ? 'opacity-0' : 'opacity-100' }`}>       
        {displayedMovies.map((movie) => (
           <Link href={`/movie/${movie.id}`} key={movie.id}>
          <div key={movie.id} className="w-52 h-72 shadow-lg mb-12" >
             <div>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full h-full object-cover hover:opacity-25 hover:cursor-pointer duration-300  " alt={movie.title}/> 
            <p>{movie.title}</p>
            </div>
          </div>
          </Link>

         
        ))}
        
        <button type="button" className="absolute top-1/2 left-40 z-30 flex items-center justify-center w-10 h-10 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full cursor-pointer group focus:outline-none transform -translate-y-1/2" onClick={handlePrev}>
          <MdSkipPrevious/>
        </button>

        <button type="button" className="absolute top-1/2 right-40 z-30 flex items-center justify-center w-10 h-10 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full cursor-pointer group focus:outline-none transform -translate-y-1/2" onClick={handleNext}>
          <MdSkipNext/>
        </button>
      </div>
    </>
  );
}
