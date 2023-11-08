"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookie from "js-cookie";
import LogIn from "@/components/LogIn/LogIn";
import SearchBar from "../SearchBar/searchBar";
import { MdAccountCircle } from "react-icons/md";

export default function Navbar() {
  const [email, setEmail] = useState(null);

  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setEmail(Cookie.get("email"));
  }, []);

  const handleSearch = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=bdeba0f284b7d753826f7cb651d9cb90&language=en-US&query=${query}&page=1`
    );
    const data = await response.json();
    setSearchResults(data.results);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div className="rounded-md">
          <img src="/Logo.png" alt="logo" id="logo" />
        </div>

        <div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <p className="text-white hover:text-blue-400 underline">Home</p>
              </Link>
            </li>
            <li>
              <Link href="#movies">
                <p className="text-white hover:text-blue-400 underline">
                  Movies
                </p>
              </Link>
            </li>
            <li>
              <Link href="#community">
                <p className="text-white hover:text-blue-400 underline">
                  Community
                </p>
              </Link>
            </li>
            <li>
              <Link href="#profile">
                <p className="text-white hover:text-blue-400 underline">
                  Profile
                </p>
              </Link>
            </li>
          </ul>
        </div>

        <SearchBar onSearch={handleSearch} searchResults={searchResults} />

        {email === null ? (
          <LogIn />
        ) : (
          <div className="flex items-center">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="User Avatar"
                className="rounded-full border-2 border-white"
                width={75}
                height={75}
              />
            ) : (
              <MdAccountCircle size={75} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
