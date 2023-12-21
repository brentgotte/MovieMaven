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
          const filePath = `ProfilePictures/${userData.user.id}/${userData.user.profile_picture}`;
          console.log('userData', userData);
          console.log('filepath', filePath);
          setImageUrl(filePath);
        }
      };



      fetchProfilePicture();
    }, []);

 
      supabase.from("Profilepictures")
    .select(`*`)
    .then((res) => {
      const data = res.data
      console.log( "pictures:", data);
    });
    


    const handleImageChange = (event) => {
      setSelectedImage(event.target.files[0]);
    };

    const publicUrl = supabase.storage.from('ProfilePictures').getPublicUrl(imageUrl);

    console.log('publicUrl', publicUrl);

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
       
      </div>
    );
  };

  export default ProfilePictureUpload;
