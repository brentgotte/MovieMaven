import React, { useState, useEffect } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useProfileData } from '../ProfileData/ProfileData';

export default function ProfilePicture() {
  const { profilePictureUrl, onImageChange } = useProfileData();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Load the saved image URL from localStorage when the component mounts
  useEffect(() => {
    const savedImageUrl = localStorage.getItem('profilePicture');
    if (savedImageUrl) {
      onImageChange(savedImageUrl);
    }
  }, [onImageChange]);

  const handleSaveImage = () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
  
        // Save the image URL to localStorage
        localStorage.setItem('profilePicture', dataUrl);
        console.log('Image saved to localStorage:', dataUrl); // Add this line
  
        // Set the image URL in the component state
        onImageChange(dataUrl);
        setIsEditing(false);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const clearLocalStorage = () => {
    // Clear the saved image URL from localStorage
    localStorage.removeItem('profilePicture');

    // Clear the image in the component state
    onImageChange(null);
  };

  return (
    <>
      {isEditing ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            ref={(input) => input && input.click()}
          />
          <button className="pr-4" onClick={handleSaveImage}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          {profilePictureUrl ? (
            <div>
              <img
                src={profilePictureUrl}
                alt="User Avatar"
                className="rounded-full border-2 border-white"
                style={{ width: '75px', height: '75px', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <MdAccountCircle size={100} />
          )}
          <button onClick={() => setIsEditing(true)}>Change Picture</button>
        </>
      )}
    </>
  );
}