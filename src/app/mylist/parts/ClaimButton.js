
import handleClose from "../../movie/[id]/page";
import { useState, useEffect } from "react";
import supabase from "@/api/supabaseClient";
import page from "../movie/[id]/page";

const ClaimButton = ({ movieId, session }) => {
  const [claimed, setClaimed] = useState(false);
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      setUser(res.data.user);
    });


    
    const checkExistingClaim = async () => {
      try {
        const { data: existingClaim, error } = await supabase
          .from("watchlist")
          .select("*")
          .eq("movie_id", movieId)
          .eq("user_id", user.id);

        if (error) {
          console.error("Error checking existing claim:", error.message);
          return;
        }

        if (existingClaim && existingClaim.length > 0) {
          setClaimed(true);
        }
      } catch (error) {
        console.error("Error checking existing claim:", error.message);
      }
    };

    checkExistingClaim();
  }, [movieId, user?.id]);

  const claimMovie = async (has_watched) => {
    try {
      if (!claimed) {
        
        await supabase.from("watchlist").insert([
          {
            movie_id: movieId,
            user_id: user.id,
            has_watched: has_watched,
          },
        ]);
        setClaimed(true);
        setSuccessMessage("Added successfully!");
      } else {
        setSuccessMessage("Movie is already claimed by the user.");
      }
    } catch (error) {
      console.error("Error claiming movie:", error.message);
    }


  };

  return (
    <div className="claim-button-container">
      <button
        onClick={() => {
          claimMovie(false);
          
        }}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
        I Want To Watch This!
      </button>
      <button
        onClick={async () => {
          await claimMovie(false);
         
        }}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        I Have Watched This!
      </button>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <style jsx>{`
        .claim-button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-message {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default ClaimButton;
