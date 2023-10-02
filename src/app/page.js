'use client'; 
import Movielist from '@/components/MovieList/MovieList';
import './globals.css';
import Moviecarousel from '@/components/MovieCarousel/Moviecarousel';
import Carouselcall from '@/components/Carouselcall/Carouselcall';

export default function Home() {
    return(
        <div>
            <h1>Home Page</h1>

            <Carouselcall />
            <Movielist />
        </div>
    )
}
