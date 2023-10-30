"use client";
import Cookie from "js-cookie";
import WatchListCard from "./parts/WatchListCard";
import supabase from "../../api/supabaseClient";
import { useState, useEffect } from "react";

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
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div>
          <h1 className="text-3xl font-bold text-center mb-10">
            {userEmail} List
          </h1>
        </div>

        <div className="grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-5 gap-4 px-8 md:px-16 lg:px-32">
          {movies.map((movie) => (
            <div key={movie.movies.id}>
              <WatchListCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
