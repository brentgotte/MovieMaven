import { fetchMovieData } from "@/lib/helper/fetchMovieDetails";

export default function Page({ movie }) {
  return (
    <>
      <div>Movie Title: {movie.title}</div>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>Overview: {movie.overview}</p>
      <p>Released: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      // Add more movie details as needed
    </>
  )
}

// Fetching movie data for the detail page using getServerSideProps
export async function getServerSideProps(context) {
  const movieId = context.params.id;
  const movieData = await fetchMovieData(movieId); // Fetch the movie data based on movieId using the imported function

  return {
    props: {
      movie: movieData
    }
  };
}