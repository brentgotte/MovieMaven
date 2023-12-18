  import React, { useState, useEffect } from 'react';
  import supabase from '@/api/supabaseClient';

  const ProfilePictureUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // State to store the image URL

    useEffect(() => {
      const fetchProfilePicture = async () => {
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching user:', error);
          return;
        }

        if (userData.user) {
          const filePath = `ProfilePictures/${userData.user.id}/${selectedImage}.jpg`;
          setImageUrl(filePath);
        }
      };

      fetchProfilePicture();
    }, []);

    const handleImageChange = (event) => {
      setSelectedImage(event.target.files[0]);
    };

    const uploadImage = async () => {
      if (!selectedImage) return;

      try {
        const { data, error: userError } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!data.user) throw new Error('No user logged in');

        const user = data.user;
        const filePath = `ProfilePictures/${user.id}/${selectedImage.name}`;

        const { error: uploadError } = await supabase.storage
          .from('ProfilePictures')
          .upload(filePath, selectedImage);
          setImageUrl(filePath);

        if (uploadError) throw uploadError;

        console.log('Upload successful');
        console.log('filePath', filePath);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    return (
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={uploadImage}>Upload Image</button>
        <img src={`https://qwjiorfvdwuxiiezpnio.supabase.co/storage/v1/object/sign/ProfilePictures/${imageUrl}`} alt="Profile" />
      </div>
    );
  };

  export default ProfilePictureUpload;
