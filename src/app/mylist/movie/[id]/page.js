"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import supabase from "@/api/supabaseClient";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { CircularProgress } from '@mui/material';

export default function page() {
  const pathName = usePathname();
  const [movieData, setMovieData] = useState(null);
  const [allGenres, setGenres] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pathParts = pathName.split("/");
    const id = pathParts[3];

    getMovieData(id);
    getGenresForMovieId(id);
  }, [pathName]);

  const getMovieData = async (id) => {
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

  const getGenresForMovieId = async (id) => {
    supabase
      .from("movies_genres")
      .select(
        `
        genres (
          genre
        )
      `
      )
      .eq("movie_id", id)
      .then(({ error, data }) => {
        if (error) {
          console.error("Error fetching genres:", error);
        } else {
          setGenres(data.map((item) => item.genres));
        }
        setLoading(false);
      });
  };
  if (loading) {
    return (
      <div className="flex justify-center pt-72">
        <CircularProgress />
      </div>
    );
  }
  if (movieData?.length === 0 || movieData === null) {
    return (
      <div className="flex justify-center pt-72">
        <h1 className="text-3xl font-bold text-center">Movie not found</h1>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col justify-evenly items-center pt-8 px-10 tablet:flex-row">
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
        <div className="inline-block w-2/3 bg-black bg-opacity-20 rounded-lg p-8 tablet:w-1/3">
          <div className="text-white text-3xl font-bold pb-5 flex text-center justify-between">
            <div>
              <h1>{movieData?.[0]?.title}</h1>
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
            <p>{movieData?.[0]?.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}
