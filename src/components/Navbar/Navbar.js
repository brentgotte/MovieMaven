'use client'
import Link from 'next/link';
import Cookie from 'js-cookie';
import LogIn from '@/components/LogIn/LogIn';

export default function Navbar() {
  const Email = Cookie.get('email');
  const isEmailCookieSet = !!Cookie.get('email');

  return (
    <>
      <div className={`flex justify-between items-center p-4 `}>
        <div className='rounded-md'>
          <img src='/Logo.png' alt='logo' id='logo'  />
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

       
        {!isEmailCookieSet ? <LogIn /> : <h1 className=' text-2xl text-white'> Welcome, {Email}</h1>}
      </div>
    </>
  );
}
