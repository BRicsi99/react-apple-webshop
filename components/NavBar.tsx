import React from 'react';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className='w-full fixed z-40 flex bg-zinc-200'>
      <div className='px-4 md:px-16 py-6 items-center transition duration-500 w-11/12'>
        <img className='h-4 lg:h-7 ' src='/next.svg' alt='Logo' />
      </div>
      <div className='items-center cursor-pointer w-1/12 my-auto justify-end'>
        <FaUser size={26} className={`text-black transition`} />
      </div>
    </nav>
  );
};

export default NavBar;
