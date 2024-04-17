import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import supabase from "../../api/supabaseClient";
import Cookie from "js-cookie";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 450,
  bgcolor: "background.paper",
  border: "4px solid none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function LogIn() {
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSignUp, setOpenSignUp] = React.useState(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);

  const openLogInModal = () => {
    handleOpen();
    handleCloseSignUp();
  };

  const openSignUpModal = () => {
    handleOpenSignUp();
    handleClose();
  };

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleLogIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMessage(true);
      console.error("Error logging in:", error.message);
    } else {
      console.log(`hello ${email}!`);
      Cookie.set("email", email, { expires: 7 });
      handleClose();
      window.location.reload();
    }
  }

  async function handleSignUp() {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log("sent")
    if (error) {
      console.error("Error signing up:", error.message);
    } else if (user) {
      handleCloseSignUp();
    }
  }
  const closeAlert = () => {
    const alertDiv = document.getElementById("alertDelete");
    alertDiv.classList.add("hidden");
  };

  return (
    <>
      <div className="flex">
        <div className="pr-4">
          <button
            id="open-login-modal"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-3 border-b-4 border-blue-700 duration-300 ease-in-out hover:border-blue-500 rounded"
            onClick={handleOpen}
          >
            Log In
          </button>
        </div>
        <div>
          <button
            className="bg-white hover:bg-gray-300 text-black font-bold py-1 px-3 border-b-4 border-gray-500 hover:border-gray-400 duration-300 ease-in-out rounded"
            onClick={handleOpenSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Typography
                id="modal-modal-title"
                className="text-black"
                variant="h5"
                component="h2"
              >
                Log In!
              </Typography>
            </div>
            <div
              className="absolute top-5 right-5 hover:cursor-pointer text-black hover:bg-gray-300 p-2 rounded"
              onClick={handleClose}
            >
              <AiOutlineClose />
            </div>

            <div className="pt-6">
              <div className="py-5">
                <TextField
                  required
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="standard-input"
                  variant="standard"
                  type="email"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogIn();
                    }
                  }}
                />
              </div>
              <div>
                <TextField
                  required
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="standard-password-input"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogIn();
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col pt-10">
              <div>
                <button
                  id="login-button"
                  onClick={handleLogIn}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 duration-300 ease-in-out hover:border-blue-500 rounded"
                >
                  Log In
                </button>
              </div>

              {errorMessage && (
                <p className="text-red-500">Incorrect email or password </p>
              )}
              <hr className="my-10 h-0.5 border-t-0 bg-black opacity-5" />
              <div className="text-black text-xs">
                Don't have an account?{" "}
                <button
                  className="underline hover:text-blue-500 pb-6"
                  onClick={openSignUpModal}
                >
                  Sign Up!
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <div
        id="alertDelete"
        className="-translate-x-1/2 left-1/2 top-10 absolute hidden z-10"
      >
        <div className="bg-green-100 rounded-lg p-4 text-black flex items-center">
          <div className="flex ">
            <BsCheck2Circle className="text-green-400 h-6 w-6" />
          </div>
          <div className="text-sm px-2">
            <span>Deleted successfully!</span>.
          </div>
          <div className="hover:cursor-pointer">
            <AiOutlineClose onClick={closeAlert} />
          </div>
        </div>
      </div>
      <Modal
        open={openSignUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Typography
                id="modal-modal-title"
                className="text-black"
                variant="h5"
                component="h2"
              >
                Sign Up!
              </Typography>
            </div>
            <div
              className="absolute top-5 right-5 hover:cursor-pointer text-black hover:bg-gray-300 p-2 rounded"
              onClick={handleCloseSignUp}
            >
              <AiOutlineClose />
            </div>

            <div className="pt-6">
              <div className="py-5">
                <TextField
                  required
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="standard-input"
                  variant="standard"
                  type="email"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignUp();
                    }
                  }}
                />
              </div>
              <div>
                <TextField
                  required
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="standard-password-input"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignUp();
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col pt-10">
              <div>
                <button
                  onClick={handleSignUp}
                  id="sign-up-button"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 duration-300 ease-in-out hover:border-blue-500 rounded"
                >
                  Sign Up
                </button>
              </div>
              <hr className="my-10 h-0.5 border-t-0 bg-black opacity-5" />
              <div className="text-black text-xs">
                Already have an account?{" "}
                <button
                  className="underline hover:text-blue-500 pb-6"
                  onClick={openLogInModal}
                >
                  Log in!
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
