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
        </div>
      </div>
    </div>
  );
};
