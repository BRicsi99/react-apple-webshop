import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { db } from '@/firebase.config';
import { CartItem } from '@/models/model';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Cart = () => {
  const { user } = useAuth();
  const { cartItems, updateCart, emptyCart } = useCart();
  const router = useRouter();

  const onAmountChange = (id: number, isIncrease: boolean) => {
    updateCart(id, isIncrease);
  };

  const onPurchase = async () => {
    if (!user.uid) {
      toast.error('Please login first');
      return;
    } else if (!cartItems.length) {
      toast.error('Please add items to the cart');
      return;
    } else {
      const purchaseData = {
        userId: user.uid,
        items: cartItems,
        timestamp: serverTimestamp(),
      };
      const date = new Date();
      await setDoc(doc(db, 'purchases', date.getTime().toString()), purchaseData);
      emptyCart();
      toast.success('Successfully purchased the items');
      router.push('/profile');
    }
  };

  return (
    <>
      <div className='m-4'>
        <header>
          <p className='text-3xl font-extrabold mb-2'>Cart</p>
        </header>
        <main>
          <div className='bg-white p-8 m-4 mobile:mx-0 mobile:p-4 rounded-xl shadow-md'>
            {!cartItems.length ? (
              <p>The cart is empty</p>
            ) : (
              <div className='flex flex-col gap-3'>
                {cartItems.map((item: CartItem, index: number) => (
                  <div key={index}>
                    <div className='flex gap-2 items-center justify-between'>
                      <img src={item.thumbnail} alt={item.title} className='w-2/5 aspect-square max-w-32 rounded-lg object-cover' />
                      <div className='flex flex-wrap items-center justify-between w-3/5'>
                        <p className='text-lg text-black font-semibold text-left'>{item.title}</p>
                        <div className='flex flex-nowrap'>
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
                    </div>
                    {index < cartItems.length - 1 && <hr className='bg-gray-600 border-0 h-px mb-4 mt-6' />}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='flex justify-center mt-12'>
            <button className={`bg-black text-white px-8 py-2 rounded-3xl`} onClick={onPurchase}>
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
