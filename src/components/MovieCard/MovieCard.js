import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function MovieCard({movie}) {
  return (
    <div className="hover:cursor-pointer group relative block overflow-hidden rounded-md transition-all duration-500">
      <Link href={`/movie/${movie.id}`} key={movie.id}>
        <CardMedia
          className="duration-500 hover:opacity-20"
          sx={{ height: 510 }}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <div className="absolute -bottom-96 group-hover:bottom-1 right-1 left-1 transition-all duration-500 bg-[#2c2f34] dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-gray-700">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-white"
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          color="white"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {movie.overview}
        </Typography>
        <p>Released: {movie.release_date}</p>

        <p>Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
}
