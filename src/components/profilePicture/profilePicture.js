import React, { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';

export default function ProfilePicture({ profilePictureUrl, onImageChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSaveImage = () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        onImageChange(dataUrl);
        setIsEditing(false);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <>
      {isEditing ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleSaveImage} // Use handleSaveImage instead
            style={{ display: 'none' }}
            ref={(input) => input && input.click()}
          />
          <button className='pr-4' onClick={handleSaveImage}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          {profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt="User Avatar"
              className="rounded-full border-2 border-white"
              width={75}
              height={75}
            />
          ) : (
            <MdAccountCircle size={100} />
          )}
          <button onClick={() => setIsEditing(true)}>Change Picture</button>
        </>
      )}
    </>
  );
}
