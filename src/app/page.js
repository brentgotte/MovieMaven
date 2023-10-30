"use client";
import Movielist from "@/components/MovieList/MovieList";
import "./globals.css";
import Carouselcall from "@/components/Carouselcall/Carouselcall";
import Watchcall from "@/components/Watchlist/Watchcall";
import Footer from "@/components/Footer/Footer";


export default function Home() {
  const isLoggedIn = document.cookie.indexOf("email") !== -1;
  console.log(isLoggedIn);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center mb-10">New And Hot</h1>
        <Carouselcall />
        <Movielist />
        <h1 className="text-3xl font-bold text-center mt-10">Your watchlist</h1>
        {isLoggedIn ? (
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
