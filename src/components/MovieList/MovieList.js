'use client'
import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import supabase from '../../api/supabaseClient'
import { CircularProgress } from '@mui/material';

export default function Movielist() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
 


  useEffect(() => {
    supabase.from('movies').select('*').then((res) => {
      const data = res.data.slice(0, 20);
      setMovies(data);
      setLoading(false);
    });

  }, []);

  

  if (loading) {
    return (
      <div className="flex justify-center pt-72">
        <CircularProgress />
      </div>
    );
  }
  

  return (
    <>


      <h1 className='text-3xl font-bold text-center mb-10'>Popular Movies</h1>
      <div className='grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-5 gap-4 px-8 md:px-16 lg:px-32'>
        {movies.map(movie => (
          <div key={movie.id}> 
          
            <MovieCard movie={movie} />
          </div>
        ))}

      </div>
   
    </>
  );
}
