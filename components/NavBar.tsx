import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  const router = useRouter();
  const { user } = useAuth();

  const loginDirecter = () => {
    if (user.uid) {
      router.push('/profile');
    } else {
      router.push('/signin');
    }
    
  }

  return (
    <nav className='w-full z-40 flex bg-zinc-200'>
      <div className='px-4 md:px-16 py-6 items-center transition duration-500 w-11/12'>
        <img className='h-4 lg:h-7 cursor-pointer' src='/next.svg' alt='Logo' onClick={() => router.push('/')}/>
      </div>
      <div className='items-center cursor-pointer w-1/12 my-auto justify-end'>
        <FaUser size={26} className={`text-black transition`} onClick={loginDirecter}/>
      </div>
    </nav>
  );
};

export default NavBar;
