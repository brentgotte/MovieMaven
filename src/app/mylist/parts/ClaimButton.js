// components/ClaimButton.js
import { useState, useEffect } from 'react';
import supabase from '@/api/supabaseClient';
const ClaimButton = ({ movieId, session }) => {
  const [claimed, setClaimed] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      setUser(res.data.user);
    });
    console.log('user: ', user);
    const checkExistingClaim = async () => {
      try {
        const { data: existingClaim, error } = await supabase
          .from('watchlist')
          .select('*')
          .eq('movie_id', movieId)
          .eq('user_id', user.id);

        if (error) {
          console.error('Error checking existing claim:', error.message);
          return;
        }

        if (existingClaim && existingClaim.length > 0) {
          setClaimed(true);
          console.log('claimed Movie: ', existingClaim[0].movie_id);
          console.log('user:' , existingClaim[0].user_id);
        }
      } catch (error) {
        console.error('Error checking existing claim:', error.message);
      }
    };

    checkExistingClaim();
  }, [movieId,  user?.id ]);

  const claimMovie = async (has_watched) => {
    try {
      if (!claimed) {
        console.log('Claiming movie...', movieId, user.id);
        await supabase
          .from('watchlist')
          .insert(
            [
              {
                movie_id: movieId,
                user_id: user.id, 
                has_watched: has_watched,
              },
            ],
          );
        setClaimed(true);
      } else {
        console.log('Movie is already claimed by the user.');
      }
    } catch (error) {
      console.error('Error claiming movie:', error.message);
    }
  };

  return (
    <>
    <button onClick={() => {claimMovie(false)}} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'  >
      <p>Click here to add to Watchlist!</p>
    </button>

<button onClick={() => {claimMovie(true)}} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'  >
      <p>Click here to add to Watched!</p>
    </button>
    </>
  );
};

export default ClaimButton;