import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AiOutlineClose } from "react-icons/ai";
import { duration } from "@mui/material";



export default function MovieCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleMovieOpen = () => setOpen(true);
  const handleMovieClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: screen,
    height: screen,
    bgcolor: "background.paper",
    border: "4px solid none",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="hover:cursor-pointer group relative block overflow-hidden rounded-md transition-all duration-500" onClick={handleMovieOpen}>
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
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
            <Image />
        </Box>
      </Modal>
    </div>
  );
}
