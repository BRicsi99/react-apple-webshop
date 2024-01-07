import ProductCard from '@/components/ProductCard';
import { ProductProps } from '@/models/model';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState<ProductProps[]>([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products`)
      .then(res => {
        setData(res.data.products);
      })
      .catch(err => {
        toast.error('Failed to fetch products');
        setData([]);
      });
  }, []);

  return (
    <div className='items-center p-4 mt-4'>
      <main>
        <h1 className='text-[#323232] text-4xl font-semibold text-center'>See Products</h1>
        <div className='flex flex-wrap my-12 mobile:px-0 px-6 w-full gap-1 justify-between'>
          {!data ? <p>No products available</p> : data.map(p => <ProductCard key={p.id} data={p} />)}
        </div>
      </main>
    </div>
  );
};

export default Home;
