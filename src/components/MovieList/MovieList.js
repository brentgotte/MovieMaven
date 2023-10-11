'use client';
import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import SearchBar from '../SearchBar/searchBar';

export default function Movielist() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=bdeba0f284b7d753826f7cb651d9cb90&language=en-US&page=1}`);
            const data = await response.json();
            setMovies(data.results);
            setLoading(false);
            console.log(data.results);
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>  

            <SearchBar />
               <h1 className='text-3xl font-bold text-center mb-10'>Popular Movies</h1>
            <div className='grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-5 grid gap-4  '>
            {movies.slice(0, 20).map(movie => (
    <div key={movie.id}> 
            <MovieCard title={movie.title} image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} overview={movie.overview} releasedate={movie.release_date} rating={movie.vote_average}/>
    </div>
))}

            </div> 
        </>
    );
}
