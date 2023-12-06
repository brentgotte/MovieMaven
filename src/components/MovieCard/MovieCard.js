import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ movie }) {
  return (
    <div
      className="hover:cursor-pointer group relative block overflow-hidden rounded-md transition-all duration-500 hover:scale-105 bg-white hover:bg-black p-0.5"
      suppressHydrationWarning={true}
    >
      <div className="hover:cursor-pointer group relative block overflow-hidden rounded-lg transition-all duration-500 hover:scale-105 bg-white hover:bg-black p-0.5">
        <div className="duration-500 hover:opacity-50">
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="rounded-lg"
              width={500}
              height={750}
              alt={movie.title}
            />
          </Link>
          <div className="absolute -bottom-96 group-hover:bottom-2 right-2 left-2 transition-all duration-500 bg-[#7a8eb0] border-solid-black border-2 dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-gray-700">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-white font-semibold"
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
            <div className="text-white">
              <p className="pt-3">Released: {movie.release_date}</p>

              <p>Rating: {movie.vote_average}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
