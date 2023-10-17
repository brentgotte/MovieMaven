"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Cookie from 'js-cookie';
import LogIn from '@/components/LogIn/LogIn';
import SearchBar from '../SearchBar/searchBar';

export default function Navbar() {
  const Email = Cookie.get('email');
  const isEmailCookieSet = !!Cookie.get('email');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=bdeba0f284b7d753826f7cb651d9cb90&language=en-US&query=${query}&page=1`
    );
    const data = await response.json();
    setSearchResults(data.results);
  };

  return (
    <>
      <div className={`flex justify-between items-center p-4 `}>
        <div className='rounded-md'>
          <img src='/Logo.png' alt='logo' id='logo' />
        </div>

        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <p className="text-white hover:text-blue-400 underline">Home</p>
            </Link>
          </li>
          <li>
            <Link href="#movies">
              <p className="text-white hover:text-blue-400 underline">Movies</p>
            </Link>
          </li>
          <li>
            <Link href="#community">
              <p className="text-white hover:text-blue-400 underline">Community</p>
            </Link>
          </li>
          <li>
            <Link href="#profile">
              <p className="text-white hover:text-blue-400 underline">Profile</p>
            </Link>
          </li>
        </ul>

          <SearchBar onSearch={handleSearch} searchResults={searchResults} />

          {!isEmailCookieSet ? <LogIn /> : <h1 className=' text-2xl text-white'> Welcome, {Email}</h1>}

      </div>
    </>
  );
}
