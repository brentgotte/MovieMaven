"use client";
import { useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import supabase from "@/api/supabaseClient";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";

export default function Page() {
  const pathName = usePathname();
  const [movieData, setMovieData] = useState(null);

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

    getMovieData();
  }, [pathName]);
  console.log(movieData);

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
            />
          </div>
          <div className="inline-block w-1/3 bg-black bg-opacity-20 rounded-lg p-8">
            <div className="text-white text-3xl font-bold pb-5 flex text-center justify-between">
              <div>
                <h1>{movieData?.[0]?.title}</h1>
              </div>
              <div className="hover:cursor-pointer">
                <IoMdAddCircle size={25}/>
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
    </>
  );
}
