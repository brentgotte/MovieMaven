import handleClose from "../../movie/[id]/page";
import { useState, useEffect } from "react";
import supabase from "@/api/supabaseClient";
import page from "../movie/[id]/page";
import { useRouter } from "next/router";

const ClaimButton = ({ movieId, session, claimed, setClaimed }) => {
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then((res) => {
        const user = res.data.user;
        setUser(user);
        return user;
      })
      .then(async (user) => {
        try {
          if (!user) return;
          const { data: existingClaim, error } = await supabase
            .from("watchlist")
            .select("*")
            .eq("movie_id", movieId)
            .eq("user_id", user.id);
          console.log(watched);

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
      });
  }, [movieId, user?.id]);

  const claimMovie = async (has_watched) => {
    if (!user) return;
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
        const { error } = await supabase
          .from("watchlist")
          .update({ has_watched })
          .eq("id", existingClaim[0].id);
        if (error) {
          console.error("Error updating claim:", error.message);
          return;
        }
        setClaimed(true);
        setSuccessMessage(
          has_watched ? "Marked as watched!" : "Added to watchlist!"
        );
      } else {
        const { error } = await supabase.from("watchlist").insert([
          {
            movie_id: movieId,
            user_id: user.id,
            has_watched,
          },
        ]);
        if (error) {
          console.error("Error inserting claim:", error.message);
          return;
        }
        setClaimed(true);
        setSuccessMessage(
          has_watched ? "Marked as watched!" : "Added to watchlist!"
        );
      }
    } catch (error) {
      console.error("Error inserting/updating claim:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="pb-4">
        <button id="wantToWatchButton"
          onClick={() => {
            setWatched(false);
            claimMovie(false);
          }}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          I Want To Watch This!
        </button>
      </div>
      <div>
        <button id="haveWatchedButton"
          onClick={ () => {
            claimMovie(true);
          }}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          I Have Watched This!
        </button>
      </div>

      {successMessage && <p className="mt-10">{successMessage}</p>}
    </div>
  );
};

export default ClaimButton;
