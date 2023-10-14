'use client'
import { useSearchParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import supabase from '@/api/supabaseClient'
import Image from 'next/image'
import CardMedia from '@mui/material/CardMedia'

export default function Page() {
  const pathName = usePathname()
  const [movieID, setMovieID] = useState(null);
  const [movieData, setMovieData] = useState(null);
  
  useEffect(() => {
    const pathParts = pathName.split('/');
    const id = pathParts[2];
    
    if (id) {
      setMovieID(id);
    }
    
    
    const getMovieData = async () => {
      const { data, error } = await supabase.from('movies').select('*').eq('id', id);
      
      if (error) {
        console.error('Error fetching movie data:', error);
      } else {
        setMovieData(data);
      }
    }
    
    getMovieData();
  }, [pathName])
  console.log(movieData);
  
  
  return (
    <>
      <div>
      <CardMedia 
        image={`https://image.tmdb.org/t/p/w500${movieData?.[0]?.poster_path}`}
        alt={movieData?.[0]?.title}
      />
        <p>
          Movie: {movieID}
        </p>
        <p>
          Movie title: {movieData?.[0]?.title}
        </p>
        <p>
          Movie overview: {movieData?.[0]?.overview}
        </p>
      </div>
    </>
  )
}