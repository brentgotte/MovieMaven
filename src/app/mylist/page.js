"use client";
import Cookie from "js-cookie";
import WatchListCard from "./parts/WatchListCard";
import supabase from "../../api/supabaseClient";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";

export default function mylist() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const userEmail = Cookie.get("email");

  useEffect(() => {
    supabase
      .from("watchlist")
      .select(`*, movies(*)`)
      .then((res) => {
        const data = res.data.slice(0, 20);
        setMovies(data);
        console.log(data);
        setLoading(false);
      });
  }, []);

  const closeAlert = () => {
    const alertDiv = document.getElementById("alertDelete");
    alertDiv.classList.add("hidden");
  };
  const handleDelete = async (movieId) => {
    try {
      const loadingDiv = document.getElementById("loadingDelete");
      loadingDiv.classList.remove("hidden");
      const { data, error } = await supabase
        .from("watchlist")
        .delete()
        .eq("movie_id", movieId)
        .single();

      if (error) {
        console.error("Error deleting movie:", error.message);
        return;
      }

      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.movies.id !== movieId)
      );
      loadingDiv.classList.add("hidden");
      const alertDiv = document.getElementById("alertDelete");
      alertDiv.classList.remove("hidden");
      setTimeout(() => {
        alertDiv.classList.add("hidden");
      }, 3000);
    } catch (error) {
      console.error("Error deleting movie:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center pt-72">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-5 gap-12 px-8 md:px-16 lg:px-32">
        <div
          id="alertDelete"
          className="-translate-x-1/2 left-1/2 top-10 absolute hidden z-10"
        >
          <div className="bg-green-100 rounded-lg p-4 text-black flex items-center">
            <div className="flex ">
              <BsCheck2Circle className="text-green-400 h-6 w-6" />
            </div>
            <div className="text-sm px-2">
              <span>Deleted successfully!</span>.
            </div>
            <div className="hover:cursor-pointer">
              <AiOutlineClose onClick={closeAlert} />
            </div>
          </div>
        </div>
        <div
          id="loadingDelete"
          className="-translate-x-1/2 left-1/2 top-1/2 absolute z-10 hidden"
        >
          <CircularProgress />
        </div>
        {movies.map((movie) => (
          <div key={movie.movies.id} className="watchListCard">
            <div className="border-solid border-2 rounded-t-xl">
              <WatchListCard movie={movie} />
            </div>
            <div className="flex items-center border-solid border-x-2 border-b-2 rounded-b-md">
              <div className="text-white grow text-center">
                <p>{movie.has_watched ? "Watched" : "On watchlist"}</p>
              </div>
              <div className="flex border-solid border-l-2">
                <button id="deleteButton"
                  className="px-3 py-1"
                  onClick={() => handleDelete(movie.movies.id)}
                >
                  <MdDelete size={25} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
