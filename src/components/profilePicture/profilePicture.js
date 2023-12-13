import React, { useState } from 'react';
import supabase from '@/api/supabaseClient';
const ProfilePictureUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };


  const uploadImage = async () => {
    if (!selectedImage) return;

    try {
      const user = supabase.auth.getUser();

      if (!user) throw new Error('No user logged in');

      const filePath = `ProfilePictures/${user.id}/${selectedImage.name}`;
      let { error, data } = await supabase.storage
        .from('ProfilePictures')
        .upload(filePath, selectedImage);

      if (error) throw error;

      console.log('Upload successful:', data);
      // Optionally: Update the user's profile with the new image URL
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default ProfilePictureUpload;
