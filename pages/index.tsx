import ProductCard from '@/components/ProductCard';
import { ProductProps } from '@/models/model';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [data, setData] = useState<ProductProps[]>([]);
  const [dataShown, setDataShown] = useState<ProductProps[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products`)
      .then(res => {
        setData(res.data.products);
        setDataShown(res.data.products.slice(0, 12));
      })
      .catch(err => {
        toast.error('Failed to fetch products');
        setData([]);
      });
  }, []);

  const fetchMoreData = () => {
    if ((dataShown.length >= data.length)) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (dataShown.length + 8 > data.length) {
        setDataShown(
          dataShown.concat(data.slice(dataShown.length, dataShown.length + (data.length - dataShown.length)))
        );
      }
      setDataShown(dataShown.concat(data.slice(dataShown.length, dataShown.length + 8)));
    }, 1500);
  };

  return (
    <div className='items-center p-4 mt-4'>
      <main>
        <h1 className='text-[#323232] text-4xl font-semibold text-center'>See Products</h1>
        <div className=' '>
          <InfiniteScroll
            dataLength={dataShown.length}
            next={fetchMoreData}
            className='flex flex-wrap my-12 mobile:px-0 px-6 w-full gap-1 justify-between'
            hasMore={hasMore}
            loader={<h4 className='w-full px-4'>Loading...</h4>}
            endMessage={
              <p className='text-center w-full'>
                <b>This is the end of the product list</b>
              </p>
            }
          >
            {!data ? <p>No products available</p> : dataShown.map(p => <ProductCard key={p.id} data={p} />)}
          </InfiniteScroll>
        </div>
      </main>
    </div>
  );
};

export default Home;
