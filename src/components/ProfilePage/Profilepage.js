import * as React from 'react';
import { MdAccountCircle } from "react-icons/md";
import { ImArrowRight } from "react-icons/Im";

export default function Profilepage() {
  return (
    <>
      <body className="bg-gray-900 flex flex-row">
        <div className="w-72 bg-teal-600 flex flex-col justify-center h-screen basis-1/6">
          <div className="border-b-2 border-white">
            <div className="flex justify-center ">
              <MdAccountCircle size={125} />
            </div>
          </div>
          <div className="flex flex-col justify-items-start border-b-2 border-white pl-2">
            <p className="text-black pt-4">Username</p>
            <p className="text-white">MovieMavenUser1</p>
            <p className="text-black">E-mail</p>
            <p className="text-white pb-6">Testmail@gmail.com</p>
          </div>
          <div className="py-4 border-y-2 flex flex-row justify-evenly">
            <div className="flex justify-center flex-col">
              <p className="text-white">Friends:</p>
              <p className="text-black pb-2">111</p>
            </div>
            <div className="flex justify-center flex-col">
              <p className="text-white ">Following:</p>
              <p className="text-black pb-2">500</p>
            </div>
            <div className="flex justify-center flex-col">
              <p className="text-white ">Followers:</p>
              <p className="text-black pb-2">555</p>
            </div>
          </div>
          <div className="py-4 flex flex-row items-baseline justify-center border-y-2 ">
            <h2 className="text-white text-xl pr-2">My watchlist</h2>
            <ImArrowRight className="inline-block align-middle " />
          </div>
          <div className="py-10 border-t-2 flex justify-center flex-col">
            <button className="ml-14 w-32 bg-white text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Log out</button>
            <button className="ml-14 mt-6  w-32 bg-white text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Switch user</button>
          </div>
          <div className="py-4 border-t-2 content-end pl-2">
            <p className="text-blue-700">Want to change your username?</p>
            <p className="text-blue-700">Want to change your e-mail?</p>
            <p className="text-blue-700">Want to change your password?</p>
          </div>
        </div>
        <div className="flex flex-col basis-5/6">
          <div className="basis-1/5 flex align-bottom">
          </div>
          <div className="basis-2/5">
            <h1 className="ml-6 text-white font-mono">Recently Reviewed</h1>
            <div className='flex flex-row justify-around'>
            </div>
          </div>
          <div className="flex flex-row basis-2/5 ml-8">
            <div className="flex flex-col basis-1/2">
              <h1 className="text-white font-mono">Recently added</h1>
            </div>
            <div className="flex flex-col basis-1/2">
              <h1 className="text-white font-mono">Downloads</h1>
            </div>
          </div>
        </div>
      </body>
    </>
  )
}