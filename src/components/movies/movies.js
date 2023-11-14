"use client"
import MovieCard from "../MovieCard/MovieCard";
import supabase from "../../api/supabaseClient";
import { useRouter } from "next/router";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
  
    useEffect(() => {
      const fetchMovies = async () => {
        const { query } = router.query; // Read query parameter from the URL
        let movieQuery = supabase.from('movies').select('*');
  
        if (query) {
          // If there is a query parameter, filter the movies based on the query
          movieQuery = movieQuery.ilike('title', `%${query}%`);
        }
  
        const res = await movieQuery;
        const data = res.data.slice(0, 20);
        setMovies(data);
        setLoading(false);
      };
  
      fetchMovies();
    }, [router.query]); // Update useEffect dependency to include router.query
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <>
        {movies.map(movie => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </>
    );
  }