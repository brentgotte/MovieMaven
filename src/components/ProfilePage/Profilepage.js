"use client"
import React, { useState, useEffect } from 'react';
import { ImArrowRight } from "react-icons/im";
import Watchlist from '../Watchlist/Watchlist';
import Cookie from 'js-cookie';
import Watchcall from '../Watchlist/Watchcall';


import LogoutButton from './parts/LogoutButton';


export default function Profilepage() {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const handleImageChange = (dataUrl) => {
    setProfilePictureUrl(dataUrl);

    // Save the profile picture URL to cookies
    Cookies.set('profilePictureUrl', dataUrl, { expires: 365 }); // Cookie expires in 365 days
  };

  const isLoggedIn = Cookie.get('email') !== undefined;

  

  const Email = Cookie.get('email');
  return (

    <>
      <div className='flex flex-row'>
        <div className="w-72 3/4 flex flex-col justify-center basis-1/6 border-r-4">
          <div className="border-b-4 border-white">
            
          </div>
          <div className="flex flex-col justify-items-start border-b-2 border-white pl-2">
            <p className="text-gray-400 pt-4">Username</p>
            <p className="text-gray-400">E-mail</p>
            {Email ? <span className="text-white pb-6">{Email}</span> : <span className="text-white pb-6">Email not found</span>}
          </div>
          <div className="py-4 border-y-2 flex flex-row justify-evenly">
            <div className="flex justify-center flex-col">
              <p className="text-white">Friends:</p>
              <p className="text-gray-400 pb-2">0</p>
            </div>
            <div className="flex justify-center flex-col">
              <p className="text-white ">Following:</p>
              <p className="text-gray-400 pb-2">0</p>
            </div>
            <div className="flex justify-center flex-col">
              <p className="text-white ">Followers:</p>
              <p className="text-gray-400 pb-2">0</p>
            </div>
          </div>
          <div className="py-4 flex flex-row items-baseline justify-center border-y-2 ">
            <h2 className="text-white text-xl pr-2">My watchlist</h2>
            <ImArrowRight className="inline-block align-middle " />
          </div>
          <div className="pt-10 border-t-2 flex justify-center flex-col">
           {isLoggedIn ? ( <LogoutButton /> ) : ( null )}
          </div>
        </div>
        <div className="flex flex-col basis-5/6">
          <div className="basis-2/5">
            <h1 className="ml-6 text-white font-mono">My watchlist</h1>
            <Watchcall />
          </div>
        </div>
      </div>
    </>
  )
}