import React from "react";
import TextField from "@mui/material/TextField";

export default () => {
  return (
    <div className="flex justify-center items-center pt-10">
      <div className="bg-white p-16 rounded text-center">
        <div>
          <h1 className="font-semibold text-xl text-black">Sign Up!</h1>
          <div className="py-8">
            <TextField
              required
              id="standard-input"
              label="Email"
              type="email"
              variant="standard"
            />
          </div>
          <div className="pb-8">
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
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 duration-300 ease-in-out hover:border-blue-500 rounded">
                Sign Up
              </button>
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
