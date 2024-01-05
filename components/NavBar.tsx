import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { FaShoppingCart, FaUser, FaUserCheck } from 'react-icons/fa';
import CartModal from './CartModal';

const NavBar = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [showCartModal, setShowCartModal] = useState(false);

  const loginDirecter = () => {
    if (user.uid) {
      router.push('/profile');
    } else {
      router.push('/signin');
    }
  };

  const toggleCartModal = useCallback(() => {
    setShowCartModal((current) => !current);
  }, []);


  return (
    <nav className='w-full z-40 flex bg-zinc-200'>
      <div className='px-4 md:px-16 py-6 items-center transition duration-500 w-[90%]'>
        <img className='h-4 lg:h-7 cursor-pointer' src='/next.svg' alt='Logo' onClick={() => router.push('/')} />
      </div>
      <div className='items-center cursor-pointer w-[5%] my-auto justify-end' onClick={toggleCartModal}>
        <FaShoppingCart size={26} className={`text-black transition`} />
        <CartModal visible={showCartModal} />
      </div>
      <div className='items-center cursor-pointer w-[5%] my-auto justify-end'>
        {user.uid ? (
          <FaUserCheck size={26} className={`text-black transition`} onClick={loginDirecter} />
        ) : (
          <FaUser size={26} className={`text-black transition`} onClick={loginDirecter} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
