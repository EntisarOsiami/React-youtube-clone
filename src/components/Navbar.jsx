import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  FiMenu,
  FiBell,
  FiUser,
  FiPlus,
} from 'react-icons/fi';
import { RiYoutubeFill } from 'react-icons/ri';
import { getUser } from '../utils/user';
import SideManu from './SideManu';
import Search from './SearchFunc';

function Navbar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const user = getUser();
  const isloggedin = user && user.isLoggedIn;
  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const toggleSideMenu = () => setIsSideMenuOpen((open) => !open);
  const closeSideMenu = () => setIsSideMenuOpen(false);
  return (
    <>
      <nav className='bg-white shadow-sm sticky top-0 z-50 h-14 px-4 flex items-center justify-between'>
        <div className='flex items-center space-x-4 min-w-0 flex-shrink-0'>
          <button
            onClick={toggleSideMenu}
            className='p-2 rounded-full hover:bg-gray-100'>
            <FiMenu size={20} />
          </button>
          <Link to='/' className='flex items-center'>
            <RiYoutubeFill size={28} className='text-red-600' />
            <span className='ml-1 text-lg font-semibold'>YouTube</span>
          </Link>
        </div>        <div className='flex-1 max-w-2xl mx-8 flex justify-center'>
          <Search />
        </div>

        <div className='flex items-center space-x-3 min-w-0 flex-shrink-0'>
          <button className='flex items-center px-3 py-1 rounded-3xl hover:bg-gray-100 text-sm'>
            <FiPlus className='mr-1' size={20} />
            Create
          </button>
          <button className='p-1 rounded-full flex items-center justify-center hover:bg-gray-200 transition'>
            <FiBell size={20} />
          </button>

          {isloggedin ? (
            <button
              onClick={logout}
              className='px-4 py-1 rounded-full bg-red-600 text-white text-sm hover:bg-red-700'>
              Logout
            </button>
          ) : (
            <Link to='/login' className='px-4 py-1 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700'>
              Login
            </Link>
          )}

          <Link to='/profile' className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center'>
            <FiUser size={20} />
          </Link>
        </div>
      </nav>
      <SideManu isOpen={isSideMenuOpen} onClose={closeSideMenu} />
    </>
  );
}

export default Navbar;
