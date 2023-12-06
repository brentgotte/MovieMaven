import { useState } from 'react';

export function useProfileData() {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const onImageChange = (dataUrl) => {
    setProfilePictureUrl(dataUrl);
  };

  return { profilePictureUrl, onImageChange };
}