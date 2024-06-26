import { useState, useEffect } from "react";
import Moviecarousel from "../MovieCarousel/Moviecarousel";
import supabase from "@/api/supabaseClient";
import { CircularProgress } from "@mui/material";

export default function Carouselcall() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("movies")
      .select("*")
      .then((res) => {
        if (res === null) {
          console.log("No movies found");
        } else {
          const data = res.data.slice(0, 20);
          setMovies(data);
          setLoading(false);
        }
      });
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
  };

  const movieChunks = chunkArray(movies, 20); // Change 2 to the number of movies you want per carousel

  if (loading) {
    return (
      <div className="flex justify-center pt-72">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className=" hidden  justify-center laptop:block">
      {movieChunks.map((chunk, idx) => (
        <Moviecarousel key={idx} movies={chunk} />
      ))}
    </div>
  );
}
