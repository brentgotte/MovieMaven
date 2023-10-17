"use client";
import { useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import supabase from "@/api/supabaseClient";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { BsBookmarkStar } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Modal, Box, Typography, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 450,
  bgcolor: "background.paper",
  border: "4px solid none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function Page() {
  const pathName = usePathname();
  const [movieData, setMovieData] = useState(null);
  const [allGenres, setAllGenres] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const pathParts = pathName.split("/");
    const id = pathParts[2];

    const getMovieData = async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error("Error fetching movie data:", error);
      } else {
        setMovieData(data);
      }
    };
    const getAllGenres = async () => {
      const { data, error } = await supabase
        .from("movies")
        .select(`
          genre_ids_0,
          genre_ids_1,
          genre_ids_2,
          genre_ids_3,
          genre_ids_4,
          genre_ids_5
        `)
        .eq("id", id);

      if (error) {
        console.error("Error fetching movie data:", error);
      } else {
        setAllGenres(data);
        console.log(data);
      }
    };

    getMovieData();
    getAllGenres();
  }, [pathName]);


  

  return (
    <>
      <div>
        <div className="flex justify-evenly items-center pt-8 px-10">
          <div className="bg-black p-3 rounded-lg">
            <Image
              className="rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${movieData?.[0]?.poster_path}`}
              width={400}
              height={750}
              alt="movie poster"
              priority
            />
          </div>
          <div className="inline-block w-1/3 bg-black bg-opacity-20 rounded-lg p-8">
            <div className="text-white text-3xl font-bold pb-5 flex text-center justify-between">
              <div>
                <h1>{movieData?.[0]?.title}</h1>
              </div>
              <div className="hover:cursor-pointer">
                <BsBookmarkStar size={25} onClick={handleOpen} />
              </div>
            </div>
            <div className="flex">
              <div>
                <p>{movieData?.[0]?.release_date}</p>
              </div>
              <div className="px-3">
                <p>|</p>
              </div>
              <div>
                <p>
                  <AiFillStar className="inline-block items-center" />
                  {movieData?.[0]?.vote_average}
                </p>
              </div>
            </div>
            <div className="text-white pt-5">
              <p>{movieData?.[0]?.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Typography
                id="modal-modal-title"
                className="text-black"
                variant="h5"
                component="h2"
              >
                Add to watchlist!
              </Typography>
            </div>

            <div
              className="absolute top-5 right-5 hover:cursor-pointer text-black hover:bg-gray-300 p-2 rounded"
              onClick={handleClose}
            >
              <AiOutlineClose />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
