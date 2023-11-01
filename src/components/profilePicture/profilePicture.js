// profilePicture.js
import React, { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useProfilePicture } from '../ProfilePictureContext';

export default function ProfilePicture() {
  const { profilePictureUrl, setProfilePictureUrl } = useProfilePicture();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePictureUrl(imageUrl);
    }
  };

  return (
    <>
      {profilePictureUrl ? (
        <img
          src={profilePictureUrl}
          alt="User Avatar"
          className="rounded-full border-2 border-white"
          width={100}
          height={125}
        />
      ) : (
        <MdAccountCircle size={100} />
      )}
    </>
  );
}
