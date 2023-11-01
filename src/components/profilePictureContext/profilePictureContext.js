import React, { createContext, useContext, useState } from 'react';

const ProfilePictureContext = createContext();

export function useProfilePicture() {
  return useContext(ProfilePictureContext);
}

export function ProfilePictureProvider({ children }) {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  return (
    <ProfilePictureContext.Provider value={{ profilePictureUrl, setProfilePictureUrl }}>
      {children}
    </ProfilePictureContext.Provider>
  );
}
