'use client'; 
import Movielist from '@/components/MovieList/MovieList';
import LogIn from '@/components/LogIn/LogIn';
import './globals.css';

export default function Home() {
    return(
        <div>
            <h1>Home Page</h1>
            <LogIn />
            <Movielist />
        </div>
    )
}
