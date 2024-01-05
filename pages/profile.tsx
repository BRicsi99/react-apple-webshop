import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const profile = () => {
  const router = useRouter();
  const { logOut } = useAuth();

  const onLogOut = async () => {
    await logOut();
    router.push('/');
  };

  return (
    <div>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogOut}>
          Logout
        </button>
      </header>
    </div>
  );
};

export default profile;
