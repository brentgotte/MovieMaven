import { useState, useEffect } from 'react';
import Moviecarousel from '../MovieCarousel/Moviecarousel';

export default function Carouselcall() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=bdeba0f284b7d753826f7cb651d9cb90&language=en-US&page=1`);
            const data = await response.json();
            setMovies(data.results);
            setLoading(false);
           
        };

        fetchMovies();
    }, []);

    // Helper function to chunk the movies array
    const chunkArray = (array, size) => {
        const chunked = [];
        let index = 0;
        while (index < array.length) {
            chunked.push(array.slice(index, size + index));
            index += size;
        }
        return chunked;
    }

    const movieChunks = chunkArray(movies, 20); // Change 2 to the number of movies you want per carousel

    if (loading) {
        return <div>Loading...</div>;
    }  
    
    return (
        <div className="flex  justify-center">
            
            {movieChunks.map((chunk, idx) => (
                <Moviecarousel key={idx} movies={chunk} />
            ))}
        </div>
    );
}
