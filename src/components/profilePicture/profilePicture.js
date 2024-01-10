  import React, { useState, useEffect } from 'react';
  import Image from 'next/image';
  import supabase from '@/api/supabaseClient';
import Dropdown from '../Dropdown/Dropdown';
import LogoutButton from '../ProfilePage/parts/LogoutButton';
import Link from 'next/link';
// import { Dropdown } from 'flowbite-react';
import { CgProfile } from "react-icons/cg";

  const ProfilePictureUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState(null); // State to store the image URL
    const [imageAlt, setImageAlt] = useState(false); // State to store the image alt

    useEffect(() => {
      const fetchProfilePicture = async () => {
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching user:', error);
          return;
        }

        if (userData.user) {
          
          const { data: profilePictureData, error: profilePictureError } = await supabase
            .from('ProfilePictures')
            .select('*')
            .eq('user', userData.user.id)
            .single();
  
          if (profilePictureError) {
            console.error('Error fetching profile picture:', profilePictureError);
          } else {
            userData.user.profile_picture = profilePictureData.name;
            const filePath = `ProfilePictures/${userData.user.id}/${userData.user.profile_picture}`;
            console.log('userData', userData);
            console.log('filepath', filePath);
            setImageUrl(filePath);
            setImageAlt(true)
          }
        }
      };



      fetchProfilePicture();
    }, []);

    const toggleModal = () => {
      setShowModal(!showModal);
    };
 
      
    


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
    
        if (uploadError) throw uploadError;
    
        // Insert a row with the image name and user ID
        const { error: insertError } = await supabase
          .from('ProfilePictures')
          .upsert([
            { user: user.id, name: selectedImage.name } // Adjust the object structure as per your table schema
          ]);
    
        if (insertError) throw insertError;
    
        console.log('Upload successful');
        console.log();
        setImageUrl(filePath);
      } catch (error) {
        console.error('Error in the process:', error);
      }
    };

    const publicUrl = supabase.storage.from('ProfilePictures').getPublicUrl(imageUrl);
    console.log('publicUrl', publicUrl);

  console.log('imageAlt', imageAlt);
    return (
      <div>
        <div className='flex justify-end mr-4'>

        {imageAlt == false ? ( <CgProfile onClick={toggleModal} />) : (<Image src={publicUrl.data.publicUrl} alt="Profile Picture" id='profilepic' width={100} height={200} onClick={toggleModal} />)}  
        </div>
        {showModal && (
          <Dropdown isOpen={showModal} onClose={toggleModal}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={uploadImage} className='hover:text-blue-500'>Upload Image</button>
            <Link href="/profile">
              <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Profile</button>
                </Link>
            <LogoutButton />
            {/* Add any other content or components you want inside the modal */}
          </Dropdown>
        )}
      </div>
    );
    
  };

  export default ProfilePictureUpload;
