import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
export default function WatchListCard({ movie }) {
  return (
    <>
      <div className="hover:cursor-pointer group relative block overflow-hidden rounded-t-md transition-all duration-500">
        <div>
          <Link href={`/mylist/movie/${movie.movies.id}`} key={movie.movies.id}>
            <CardMedia
              className="duration-500 hover:opacity-20"
              sx={{ height: 510 }}
              image={`https://image.tmdb.org/t/p/w500${movie.movies.poster_path}`}
              alt={movie.movies.title}
            />
          </Link>
        </div>
        
        <div className="absolute -bottom-96 group-hover:bottom-2 right-2 left-2 transition-all duration-500 bg-[#7a8eb0] border-solid-black border-2 dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-gray-700">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-white font-semibold"
          >
            {movie.movies.title}
          </Typography>
          <Typography
            variant="body2"
            className="text-white font-mono"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {movie.movies.overview}
          </Typography>
          <div className="text-white">
            <p className="pt-3">Released: {movie.release_date}</p>

            <p>Rating: {movie.vote_average}</p>
          </div>
        </div>
      </div>
    </>
  );
}
