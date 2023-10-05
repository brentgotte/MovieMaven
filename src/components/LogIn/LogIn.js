import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import supabase from "../../api/supabaseClient";

import { AiOutlineClose } from "react-icons/ai";

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
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email, 
      password: password,
    });
  
    if (error) {
      console.error("Error logging in:", error.message);

     
    } else {
        console.log(`hello ${email}!`)
        handleClose();
    }
  }
  

  async function handleSignUp() {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  
    if (error) {
      console.error("Error signing up:", error.message);
      // You can also display the error to the user if you want
    } else if (user) {
      handleCloseSignUp();
    }
  }
  function AlertBox({ show, onClose }) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-md shadow-lg w-96">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">Login Failed</h2>
              <p className="mt-2 text-red-600">Incorrect email or password. Please try again.</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
              &times;
            </button>
          </div>
        </div>
      </div>
    );
  }
  


  return (
    <>
      <div className="flex">
        <div className="pr-4">
          <button
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
                  onChange={(e) => setEmail(e.target.value)}
                  id="standard-input"
                  label="Email"
                  variant="standard"
                  type="email"
                />
              </div>
              <div>
                <TextField
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                />
              </div>
            </div>
            <div className="flex flex-col pt-10">
              <div>
                <button  onClick={handleLogIn} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 duration-300 ease-in-out hover:border-blue-500 rounded">
                  Log In
                </button>
              </div>
              <hr className="my-10 h-0.5 border-t-0 bg-black opacity-5" />
              <div className="text-black text-xs">
                Don't have an account?{" "}
                <button className="underline hover:text-blue-500 pb-6" onClick={openSignUpModal}>
                  Sign Up!
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

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
                  onChange={(e) => setEmail(e.target.value)}
                  id="standard-input"
                  label="Email"
                  variant="standard"
                  type="email"
                />
              </div>
              <div className="pb-5">
                <TextField
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="standard-input"
                  label="Username"
                  variant="standard"
                  type="text"
                />
              </div>
              <div>
                <TextField
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                />
              </div>
            </div>
            <div className="flex flex-col pt-10">
              <div>
                <button onClick={handleSignUp} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 duration-300 ease-in-out hover:border-blue-500 rounded">
                  Sign Up
                </button>
              </div>
              <hr className="my-10 h-0.5 border-t-0 bg-black opacity-5" />
              <div className="text-black text-xs">
                Already have an account?{" "}
                <button className="underline hover:text-blue-500 pb-6" onClick={openLogInModal}>
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
