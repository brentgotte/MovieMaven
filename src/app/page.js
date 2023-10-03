'use client'; 
import Movielist from '@/components/MovieList/MovieList';
import './globals.css';
import Carouselcall from '@/components/Carouselcall/Carouselcall';

export default function Home() {
    return(
        <div>
            <h1 className='text-3xl font-bold text-center mb-10'>New And Hot</h1>
            <Carouselcall />
            <Movielist />
        </div>
    )
}
