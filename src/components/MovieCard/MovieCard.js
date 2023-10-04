import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function MovieCard(props) {
  return (
    <div className="hover:cursor-pointer group relative block overflow-hidden rounded-md transition-all duration-500">
      <CardMedia
        className="duration-500 hover:opacity-20"
        sx={{ height: 450 }}
        image={props.image}
        alt={props.title}
      />
      <div className="absolute -bottom-52 group-hover:bottom-2 right-2 left-2 transition-all duration-500 bg-[#2c2f34] dark:bg-slate-900 p-4 rounded-lg shadow dark:shadow-gray-700">
        <Typography gutterBottom variant="h5" component="div" className="text-white">
          {props.title}
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
          {props.overview}
        </Typography>
        <p>Released: {props.releasedate}</p>

        <p>Rating: {props.rating}</p>
      </div>
    </div>
  );
}
