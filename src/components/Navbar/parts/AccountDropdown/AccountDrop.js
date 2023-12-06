import { useState } from 'react';
import Link from 'next/link';
import LogoutButton from '@/components/ProfilePage/parts/LogoutButton';
import ProfilePicture from '@/components/profilePicture/profilePicture';

export default function AccountDrop() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handeProfileClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <ProfilePicture onClick={handeProfileClick} />
      </div>

      {dropdownOpen && (
        <div className="absolute top-16 right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <div className="py-2">
            <Link href="/profile">
              <p className="block px-4 py-2  text-gray-800 hover:bg-gray-200">
                Profile
              </p>
            </Link>
          <div className='mt-2'>
              <LogoutButton />
           </div>
           <div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
