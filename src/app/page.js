'use client'; 
import Movielist from '@/components/MovieList/MovieList';
import './globals.css';
import MovieCard from '@/components/MovieCard/MovieCard';

export default function Home() {
    return(
        <div>
            <h1>Home Page</h1>
            <Movielist />
        </div>
    )
}
