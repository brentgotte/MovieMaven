'use client';
import React, { useState, useEffect } from "react";

import Link from "next/link";
import Cookie from "js-cookie";
import LogIn from "@/components/LogIn/LogIn";
import SearchBar from "../SearchBar/searchBar";
import { MdAccountCircle } from "react-icons/md";
import ProfilePicture from '../profilePicture/profilePicture';
import AccountDrop from "./parts/AccountDropdown/AccountDrop";

export default function Navbar() {
  const [email, setEmail] = useState(null);
  const isEmailCookieSet = !!email;
  const [searchResults, setSearchResults] = useState([]);
  const profilePictureUrl = '...';

  const handleSearch = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=bdeba0f284b7d753826f7cb651d9cb90&language=en-US&query=${query}&page=1`
    );
    const data = await response.json();
    setSearchResults(data.results);
  };

  useEffect(() => {
    setEmail(Cookie.get("email"));
  }, []);


  return (
    <>
      <nav className="flex justify-between items-center p-4" id="navbar">
        <div className="rounded-md">
          <Link href={"/"}>
            <img src="/Logo.png" alt="logo" id="logo" />
          </Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <p className="text-white hover:text-blue-400 underline">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/movies">
              <p className="text-white hover:text-blue-400 underline">Movies</p>
            </Link>
          </li>
        </ul>

    <SearchBar onSearch={handleSearch} searchResults={searchResults} />
      <div id="profilePic">
        {isEmailCookieSet ? (
          <ProfilePicture profilePictureUrl={profilePictureUrl} />
        ) : (
          <LogIn />
        )}
      </div>
      </nav>
    </>
  );
}