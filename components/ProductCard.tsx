import { ProductProps } from '@/models/model';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface ProductCardProps {
  data: ProductProps;
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className='items-center justify-center mx-auto mb-4 bg-white rounded-lg shadow-md overflow-hidden desktop:w-[31%] tablet:w-[48%] w-[23%] p-2'>
      <div className='flex flex-wrap content-between h-full'>
        <div className='flex flex-wrap content-start'>
          <div className='w-full relative'>
            <img className='object-cover h-[150px] w-full rounded-lg' src={data.thumbnail} alt={data.title} />
            <button className='bg-[#6100FF] rounded-2xl my-2 px-4 py-1 w-min text-white cursor-text absolute top-0 right-2 text-sm'>
              -{data.discountPercentage}%
            </button>
          </div>
          <div className='flex w-full items-center justify-between py-2 gap-1'>
            <div className='w-3/4'>
              <div className='text-lg text-[#323232] font-semibold text-ellipsis overflow-hidden w-full whitespace-nowrap'>
                {data.title}
              </div>
              <div className='text-sm text-[#323232] file:font-medium line-clamp-2 w-full'>{data.description}</div>
            </div>
            <div className='w-1/4 h-full content-start'>
              <p className='text-xl font-semibold text-[#323232] text-right'>{data.price} $</p>
            </div>
          </div>
        </div>

        <div className='w-full mt-2 mb-4 mx-2'>
          <button
            className='bg-black text-white w-full py-2 rounded-3xl'
            onClick={() => router.push(`/products/${data.id}`)}
          >
            <p className='text-base font-semibold'>See details</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
