import { useCart } from '@/context/CartContext';
import { CartItem } from '@/models/model';
import Link from 'next/link';

const Cart = () => {
  const { cartItems, updateCart } = useCart();

  const onAmountChange = (id: number, isIncrease: boolean) => {
    updateCart(id, isIncrease);
  };

  return (
    <>
      <div className='m-4'>
        <header>
          <p className='text-3xl font-extrabold mb-2'>Cart</p>
        </header>
        <main>
          <div className='bg-white p-8 m-4 rounded-xl shadow-md'>
            <div className='flex flex-col gap-3'>
              {cartItems.map((item: CartItem, index: number) => (
                <>
                  <div key={index} className='flex gap-2 items-center justify-between'>
                    <img src={item.thumbnail} alt={item.title} className='w-32 h-32 rounded-lg object-cover' />
                    <p className='text-lg text-black font-semibold text-center'>{item.title}</p>
                    <div>
                      <button
                        className='bg-[#6100FF] rounded-l-lg my-2 px-2 w-min text-white cursor-pointer border-2 border-[#6100FF]'
                        onClick={() => {
                          onAmountChange(item.id, false);
                        }}
                      >
                        -
                      </button>
                      <button className='bg-[#f2f4f8] my-2 px-2 w-min text-black cursor-auto border-2'>
                        {item.quantity}
                      </button>
                      <button
                        className='bg-[#6100FF] rounded-r-lg my-2 px-2 w-min text-white cursor-pointer border-2 border-[#6100FF]'
                        onClick={() => {
                          onAmountChange(item.id, true);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <hr className='bg-gray-600 border-0 h-px' />}
                </>
              ))}
            </div>
          </div>
          <div className='flex justify-center mt-12'>
            <button className={`bg-black text-white px-8 py-2 rounded-3xl`}>
              <p className='cursor-pointer text-2xl font-bold'>Purchase</p>
            </button>
          </div>
          <div className='flex justify-center items-center'>
            <Link href='/' className='text-[#6100FF] font-semibold text-center mt-10 mb-12'>
              Back to the Shop
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default Cart;
