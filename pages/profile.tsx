import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase.config';
import { IoIosArrowForward } from 'react-icons/io';
import PurchaseItem from '@/components/PurchaseItem';
import { PurchasesProps } from '@/models/model';

const profile = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [purchases, setPurchases] = useState<PurchasesProps[]>([]);

  useEffect(() => {
    const fetchUserListings = async () => {
      const purchasesRef = collection(db, 'purchases');
      const q = query(
        purchasesRef,
        where("userId", "==", user.uid),
      );

      const querySnap = await getDocs(q);

      let listings: any = [];

      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setPurchases(listings);
    };

    fetchUserListings();
  }, [user.uid]);

  const onLogOut = async () => {
    await logOut();
    router.push('/');
  };

  return (
    <div className='m-4'>
      <header className='flex justify-between items-center'>
        <p className='text-[2rem] font-extrabold'>My Profile</p>
        <button
          type='button'
          className='cursor-pointer text-base font-semibold text-white bg-[#00cc66] px-3 py-1 rounded-2xl'
          onClick={onLogOut}
        >
          Logout
        </button>
      </header>
      <main>
        <div className='flex justify-between w-full my-4'>
          <p className='font-semibold'>Personal Details</p>
        </div>
        <div className='bg-white shadow-[rgba(0,0,0,0.2)] w-full p-4 rounded-2xl'>
          <form>
            <label htmlFor="name">Name</label>
            <input
              type='text'
              id='name'
              className='font-semibold w-full mx-0 my-[0.3rem]'
              disabled
              value={user.name}
            />
            <label htmlFor="email">Email</label>
            <input
              type='text'
              id='email'
              className='font-semibold w-full mx-0 my-[0.3rem] text-black'
              disabled
              value={user.email}
            />
          </form>
        </div>
        <div className='w-full my-4 py-4 rounded-2xl justify-center flex'>
          <button
            className='flex items-center justify-center bg-black text-white py-2 rounded-3xl w-1/2'
            onClick={() => router.push('/')}
          >
            <p className='cursor-pointer text-xl font-bold'>Start your purchase</p>
            <div className='cursor-pointer flex justify-center items-center w-10 h-10 ml-4'>
              <IoIosArrowForward fill='#ffffff' size={24} />
            </div>
          </button>
        </div>

        {purchases && (
          <>
            <p className='font-semibold mt-8'>Your Purchases</p>
            <ul className='listingsList'>
              {purchases.map((purchase: PurchasesProps, index: number) => (
                <PurchaseItem key={index} purchase={purchase}/>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default profile;
