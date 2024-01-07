import { useCart } from '@/context/CartContext';
import { CartItem, ProductProps } from '@/models/model';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaCircle, FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [data, setData] = useState<ProductProps | undefined>(undefined);
  const [galleryPicture, setGalleryPicture] = useState<number>(0);
  const [ratingNumber, setRatingNumber] = useState<number[]>([]);

  useEffect(() => {
    if (router.query.id !== undefined) {
      axios
        .get(`https://dummyjson.com/products/${router.query.id}`)
        .then(res => {
          setData(res.data);
          setStars(res.data.rating);
        })
        .catch(err => {
          toast.error('Failed to fetch the product');
          setData(undefined);
        });
    }
  }, [router]);

  const pictureChanger = (direction: string) => {
    if (direction === 'next') {
      if (data && galleryPicture === data?.images.length - 1) {
        setGalleryPicture(0);
      } else {
        setGalleryPicture(galleryPicture + 1);
      }
    } else if (direction === 'prev') {
      if (data && galleryPicture === 0) {
        setGalleryPicture(data?.images.length - 1);
      } else {
        setGalleryPicture(galleryPicture - 1);
      }
    }
  };

  const setStars = (score: number) => {
    setRatingNumber([]);
    const rounded = Math.floor(score);
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        setRatingNumber(prevStatus => [...prevStatus, 1]);
      } else {
        setRatingNumber(prevStatus => [...prevStatus, 0]);
      }
    }
  };

  const onAddToChart = () => {
    const product: CartItem = {
      id: data?.id as number,
      title: data?.title as string,
      thumbnail: data?.thumbnail as string,
      quantity: 1,
    };
    addToCart(product);
    toast.success('Product added to chart');
  };

  return (
    <div className='items-center p-4 mt-4'>
      {!data ? (
        <>
          <h1 className='text-[#323232] text-4xl font-semibold text-center'>Product not found</h1>
          <div className='flex justify-center'>
            <button className='bg-black text-white w-[50%] py-2 my-8 rounded-3xl' onClick={() => router.push('/')}>
              Back to the webshop
            </button>
          </div>
        </>
      ) : (
        <div className='flex flex-wrap my-12 px-6 w-full justify-between mobile:my-6'>
          <div className='w-6/12 flex flex-wrap gap-1 justify-center pr-4 mobile:w-full mobile:px-0 mobile:justify-between'>
            <IoIosArrowBack
              fill='#323232'
              size={24}
              className='h-full cursor-pointer'
              onClick={() => pictureChanger('prev')}
            />
            <img
              src={data.images[galleryPicture]}
              alt={data.title}
              className='rounded-lg shadow-lg w-[80%] h-72 object-cover'
            />
            <IoIosArrowForward
              fill='#323232'
              size={24}
              className='h-full cursor-pointer'
              onClick={() => pictureChanger('next')}
            />
            <div className='w-full flex gap-2 content-center px-[10%] justify-center'>
              {data.images.map((image, index: number) => (
                <FaCircle
                  key={index}
                  fill={`${index === galleryPicture ? '#6100FF' : 'rgba(50, 50, 50, 0.60)'} `}
                  size={10}
                />
              ))}
            </div>
          </div>
          <div className='w-6/12 pl-4 flex flex-wrap h-auto content-start mobile:w-full mobile:px-0 mobile:mt-8'>
            <div className='w-1/2'>
              <h2 className='text-[#323232] text-3xl not-italic font-semibold'>{data.title}</h2>
            </div>
            <div className='w-1/2 flex justify-end h-7'>
              <div className='flex gap-1 mr-4 items-center'>
                {ratingNumber.map((color, index) => (
                  <FaStar key={index} fill={'#6100FF'} className={`${color === 1 ? 'opacity-100' : 'opacity-30'}`} />
                ))}
              </div>
              <p className='text-[#323232] text-2xl font-semibold text-right'>{data?.rating}</p>
            </div>
            <div className='grid w-full gap-y-1 mt-2'>
              <p className='text-black text-lg font-medium'>{data.description}</p>
              <p className='text-black text-lg font-medium opacity-60'>Stock: {data.stock}</p>
              <p className='text-black text-lg font-medium opacity-60'>Brand: {data.brand}</p>
              <p className='text-black text-lg font-medium opacity-60'>Category: {data.category}</p>
              <button className='bg-[#6100FF] rounded-2xl my-2 px-4 py-1 w-min text-white cursor-text'>
                -{data.discountPercentage}%
              </button>
            </div>
            <div className='w-1/2'>
              <h1 className='text-4xl font-semibold'>{data.price} $</h1>
            </div>
            <div className='w-1/2'>
              <button className='bg-black text-white w-full py-2 rounded-3xl' onClick={onAddToChart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
