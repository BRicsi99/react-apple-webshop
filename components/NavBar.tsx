import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { FaShoppingCart, FaUser, FaUserCheck } from 'react-icons/fa';
import CartModal from './CartModal';
import { useCart } from '@/context/CartContext';
import { TiHome } from "react-icons/ti";

const NavBar = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);

  const loginDirecter = () => {
    if (user.uid) {
      router.push('/profile');
    } else {
      router.push('/signin');
    }
  };

  const toggleCartModal = useCallback(() => {
    setShowCartModal(current => !current);
  }, []);

  return (
    <nav className='w-full z-40 flex bg-zinc-200'>
      <div className='px-4 md:px-16 py-6 items-center transition duration-500 w-[90%] mobile:w-[80%]'>
        <TiHome size={26} className='  cursor-pointer object-cover' alt='Logo' onClick={() => router.push('/')} />
      </div>
      <div className='items-center cursor-pointer w-[60px] my-auto justify-end relative py-1' onClick={toggleCartModal}>
        <FaShoppingCart size={26} className={`text-black transition`} />
        <button className='bg-red-600 rounded-2xl w-min text-white text-[10px] cursor-none absolute bottom-0 right-7 px-1'>{cartItems.length}</button>
        <CartModal visible={showCartModal} />
      </div>
      <div className='items-center cursor-pointer w-[40px] my-auto justify-end'>
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
