"use client";
import Cookie from "js-cookie";
import WatchListCard from "./parts/WatchListCard";
import supabase from "../../api/supabaseClient";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { MdDelete } from "react-icons/md";

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

  if (loading) {
    return (
      <div className="flex justify-center pt-72">
        <CircularProgress />
      </div>
    );
  }
  

  return (
    <>
      <div className="flex justify-center">
        <div className="text-3xl font-bold text-center mb-10 inline-block">
          <h1>{userEmail} List</h1>
        </div>
        <div className=" items-center"></div>
      </div>

      <div className="grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-5 gap-4 px-8 md:px-16 lg:px-32">
        {movies.map((movie) => (
          <>
            <div>
              <div
                className="border-solid border-2 rounded-t-xl"
                key={movie.movies.id}
              >
                <WatchListCard movie={movie} />
              </div>
              <div className="flex items-center border-solid border-x-2 border-b-2 rounded-b-md">
                <div className="text-white grow text-center">
                  <p>
                    {movie.has_watched ? "Watched" : "On watchlist"}
                  </p>
                </div>
                <div className="flex border-solid border-l-2">
                  <button className="px-3 py-1">
                    <MdDelete size={25} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
