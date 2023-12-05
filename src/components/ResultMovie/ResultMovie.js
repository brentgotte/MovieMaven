"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/router instead of next/navigation
import supabase from "../../api/supabaseClient";

export default function ResultMovie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const query = router.query.query; // Access the "query" parameter

  useEffect(() => {
    if (query) {
      // Check if the query parameter is defined
      let movieQuery = supabase
        .from("movies")
        .select("*")
        .ilike("title", `%${query}%`)
        .then((res) => {
          const data = res.data.slice(0, 20);
          setMovies(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Release Year: {movie.release_year}</p>
            <p>Director: {movie.director}</p>
            {/* Add more movie details here as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}
