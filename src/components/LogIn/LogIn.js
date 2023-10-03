import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";

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

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-400 text-white border-b-4 font-semibold border-blue-700 hover:border-blue-500 rounded w-30 h-7"
        onClick={handleOpen}
      >
        Log In
      </Button>
      <Link href="signup">
        <Button className="bg-white hover:bg-gray-300 text-gray-800 font-semibold border-blue-700 rounded w-30 h-7 shadow-md">
          Sign Up
        </Button>
      </Link>
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
            <div className="absolute top-5 right-5 hover:cursor-pointer text-black hover:bg-gray-300 p-2 rounded">
              <AiOutlineClose onClick={handleClose} />
            </div>

            <div className="pt-6">
              <div className="py-5">
                <TextField
                  required
                  id="standard-input"
                  label="Username"
                  variant="standard"
                />
              </div>
              <div>
                <TextField
                  required
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
                <Button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded w-20 h-7 shadow-md">
                  Sign Up
                </Button>
              </div>
              <hr className="my-10 h-0.5 border-t-0 bg-black opacity-5" />
              <div className="text-black text-xs">
                Don't have an account?{" "}
                <a href="signup" className="underline">
                  Create one!
                </a>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}