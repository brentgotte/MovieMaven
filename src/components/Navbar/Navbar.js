'use client';
import Link from 'next/link';
// import Image from 'next/image';
// import styles from './Navbar.module.css';



export default function Navbar() {
  return (
    <>
      <div className={`flex justify-between items-center p-4 `}>
        {/* This can be a logo or brand name */}
        <div className='rounded-md'>
        <img src='/Logo.png' alt='logo' id='logo'  />
        </div>

        <ul className="flex space-x-4">
          <li>
            <Link href="#home">
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

        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Login
        </button>
      </div>
    </>
  );
}
