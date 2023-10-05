const API_KEY = 'bdeba0f284b7d753826f7cb651d9cb90';

async function fetchMovieData(movieId) {
  const endpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  
  const response = await fetch(endpoint);
  
  if (!response.ok) {
    throw new Error('Failed to fetch movie data');
  }
  
  const movieData = await response.json();
  return movieData;
}

export { fetchMovieData };
