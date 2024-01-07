import { PurchasesProps } from '@/models/model';
import Link from 'next/link';
import React, { FC } from 'react';

interface PurchaseItemProps {
  purchase: PurchasesProps;
}

const PurchaseItem: FC<PurchaseItemProps> = ({ purchase }) => {
  const timestamp = new Date(purchase.data.timestamp.seconds * 1000);
  return (
    <li>
      <div className='bg-white p-8 my-4 rounded-xl shadow-md'>
        <p>Purchase ID: <span className='font-semibold'>{purchase.id}</span></p>
        <p>Purchase date: <span className='font-semibold'>{timestamp.toLocaleDateString()}</span></p>
        <p className='mb-4'>Items:</p>
        {purchase.data.items.map((item, index) => (
          <div key={index}>
            <div className='flex gap-4 items-center justify-between'>
              <img src={item.thumbnail} alt={item.title} className='w-10 h-10 rounded-lg object-cover' />
              <Link href={`/products/${item.id}`}>
                <p className='text-lg text-black font-semibold text-center'>{item.title}</p>
              </Link>
              <button className='bg-[#6100FF] rounded-2xl my-2 px-2 w-min text-white cursor-text'>
                {item.quantity}
              </button>
            </div>
            {index < purchase.data.items.length - 1 && <hr className='bg-gray-400 border-0 h-px my-4' />}
          </div>
        ))}
      </div>
    </li>
  );
};

export default PurchaseItem;
