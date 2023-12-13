"use client"
import { useState, useEffect } from 'react';
import supabase from '../../api/supabaseClient';
import MovieCard from '../MovieCard/MovieCard';

export default function ResultMovie({ query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if (query) {
        setLoading(true);
        supabase
          .from('movies')
          .select('*')
          .ilike('title', `%${query}%`)
          .then((res) => {
            if (res.error) {
              throw res.error;
            }
            setMovies(res.data.slice(0, 20));
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      } else {
        setMovies([]);
        setLoading(false);
      }
    // }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (movies.length === 0) {
    return <div>No movies found for this search.</div>;
  }

  return (
    <div className='grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-5 gap-4 px-8 md:px-16 lg:px-32'>
        {movies.map(movie => (
          <div key={movie.id}> 

            <MovieCard movie={movie} />
          </div>
        ))}

      </div>
  );
}