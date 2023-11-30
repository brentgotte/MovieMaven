"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/api/supabaseClient";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { BsBookmarkStar } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Modal, Box, Typography } from "@mui/material";
import ClaimButton from "@/app/mylist/parts/ClaimButton";

import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

import { BsCheck2Circle } from "react-icons/bs";
import { CircularProgress } from "@mui/material";


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



export default function Page({ params }) {
  const [user, setUser] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [allGenres, setGenres] = useState(null);
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loadAndUpdateClaim = async (userId) => {
    supabase
      .from("watchlist")
      .select("*")
      .eq("movie_id", params.id)
      .eq("user_id", userId)
      .then(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        setClaimed(data?.length > 0)
      });
  }

  const loadAndUpdateUser = () => {
    supabase.auth.getUser()
      .then(({ data: { user }, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        setUser(user)
        loadAndUpdateClaim(user.id)
      })
  }

  const loadAndUpdateMovie = async () => {
    // select first movie with id
    supabase
      .from("movies")
      .select("*")
      .eq("id", params.id)
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        setMovieData(data);
        return;
      });
  };

  const loadAndUpdateGenres = async () => {
    supabase
      .from("movies_genres")
      .select(`genres (genre)`)
      .eq("movie_id", params.id)
      .then(({ error, data }) => {
        if (error) {
          throw new Error(error.message);
        }
        setGenres(data.map((item) => item.genres));
      });
  };


  useEffect(() => {
    try {
      Promise.all([
        loadAndUpdateMovie(),
        loadAndUpdateGenres(),
        loadAndUpdateUser(),
      ]).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.error("Error loading:", error.message);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center pt-72">
        <CircularProgress />
      </div>
    );
  }
  if (movieData === null) {
    return (
      <div className="flex justify-center pt-72">
        <h1 className="text-3xl font-bold text-center">Movie not found</h1>
      </div>
    );
  }


  const alertMessage = () => {
    const alertDiv = document.getElementById("alert");
    setOpen(false);
    if (alertDiv) {
      alertDiv.classList.remove("hidden");
    } setTimeout(() => {
      alertDiv.classList.add("hidden");
    }, 2000);
  };
  const closeAlert = () => {
    const alertDiv = document.getElementById("alert");
    alertDiv.classList.add("hidden");
  };

  const storeClaimed = (claim) => {
    supabase.from("watchlist")
      .upsert({
        has_watched: claim,
        movie_id: params.id,
        user_id: user.id,
      })
      .then(({ error }) => {
        if (error) {
          console.error("Error updating claim:", error);
        } else {
          setClaimed(claim)
        }
      });
  };


  return (
    <>
      <div>
        <div id="alert" className="-translate-x-1/2 left-1/2 absolute hidden">
          <div className="bg-green-100 rounded-lg p-4 text-black flex items-center">
            <div className="flex ">
              <BsCheck2Circle className="text-green-400 h-6 w-6" />
            </div>
            <div className="text-sm px-2">
              <span>Added successfully!</span>.
            </div>
            <div className="hover:cursor-pointer">
              <AiOutlineClose onClick={closeAlert} />
            </div>
          </div>
        </div>
        <div className="flex justify-evenly items-center pt-8 px-10">

          <div className="bg-black p-3 rounded-lg">
            <Image
              className="rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}
              width={400}
              height={750}
              alt="movie poster"
              priority
            />
          </div>
          <div className="inline-block w-2/3 bg-black bg-opacity-20 rounded-lg p-8 tablet:w-1/3 ">
            <div className="text-white text-3xl font-bold pb-5 flex text-center justify-between">
              <div>

                <h1>{movieData?.title}</h1>
              </div>
              <div className="hover:cursor-pointer">
                <BsBookmarkStar size={25} onClick={handleOpen} />
              </div>
            </div>
            <div className="flex">
              <div>
                <p>{movieData?.release_date}</p>
              </div>
              <div className="px-3">
                <p>|</p>
              </div>
              <div>
                <p>
                  <AiFillStar className="inline-block items-center" />
                  {movieData?.vote_average}
                </p>
              </div>
              <div className="px-3">
                <p>|</p>
              </div>
              <div>
                <p>
                  {claimed ? <AiFillEye size={20} /> : <AiFillEyeInvisible />}
                </p>
              </div>
            </div>
            <div className="pt-3">
              <p className="text-gray-400 text-sm">
                {allGenres?.map((item) => (
                  <span key={item.genre} className="pr-2">
                    {" "}
                    {item.genre}{" "}
                  </span>
                ))}
              </p>
            </div>
            <div className="text-white pt-5">
              <p>{movieData?.overview}</p>

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
            <div className="flex justify-center mt-12" onClick={alertMessage}>
              <ClaimButton movieId={params.id} setClaimed={storeClaimed} claimed={claimed} />

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
