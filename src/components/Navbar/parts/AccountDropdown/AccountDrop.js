import { useState } from 'react';
import Link from 'next/link';
import { MdAccountCircle } from 'react-icons/md';
import LogoutButton from '@/components/ProfilePage/parts/LogoutButton';

export default function AccountDrop() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <MdAccountCircle size={75} />
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
          </div>
        </div>
      )}
    </div>
  );
}
