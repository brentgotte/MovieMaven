"use client";
import Movielist from "@/components/MovieList/MovieList";
import "./globals.css";
import Carouselcall from "@/components/Carouselcall/Carouselcall";
import Watchcall from "@/components/Watchlist/Watchcall";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";


export default function Home() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(Cookie.get("email"));
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center mb-10">New And Hot</h1>
        <Carouselcall />
        <Movielist />
        <h1 className="text-3xl font-bold text-center mt-10">Your watchlist</h1>
        {email !== null ? (
          <Watchcall />
        ) : (
          <p className="text-3xl font-bold text-center mb-10">
            You need to log in to see your watchlist
          </p>
        )}
        <Footer />
      </div>
    </>
  );

}
