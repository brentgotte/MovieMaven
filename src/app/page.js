'use client'; // I assume you meant 'use strict'
import { useState, useEffect } from 'react';
import Movielist from '@/components/MovieList';
import './globals.css';

export default function Home() {
    return(
        <div>
            <h1>Home Page</h1>
            <Movielist />
        </div>
    )
}
