import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="bg-white p-12 rounded text-center">
        <div>
          <h1 className="font-semibold text-black">Sign Up!</h1>
          <div className="py-10">
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
          <div className="flex flex-col pt-10">
            <div>
              <Button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded w-20 h-7 shadow-md">
                Sign Up
              </Button>
            </div>
            <hr className="my-6 h-0.5 border-t-0 bg-black opacity-5"/>
            <div className="text-black text-xs">
              Already have an account? <a href="/" className="underline">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
