'use client';

import Cookie from "js-cookie";

export default function mylist() {
    const userEmail = Cookie.get('email');
    console.log("page.js")
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-10">
        {userEmail} Profile page
      </h1>
    </>
  );
}
