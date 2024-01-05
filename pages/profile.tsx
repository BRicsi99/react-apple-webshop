import React from 'react';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';

const profile = () => {
  const auth = getAuth();
  const router = useRouter();

  const onLogOut = () => {
    auth.signOut();
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
