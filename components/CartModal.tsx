import { useCart } from '@/context/CartContext';
import { CartItem } from '@/models/model';
import { useRouter } from 'next/router';

interface CartModalProps {
  visible?: boolean;
}

const CartModal: React.FC<CartModalProps> = ({ visible }) => {
  if (!visible) return null;
  const { cartItems } = useCart();
  const router = useRouter();

  return (
    <div className='bg-white w-56 absolute top-12 right-6 p-4 border-2 border-gray-400 rounded-xl z-50'>
      <div className='flex flex-col gap-3'>
        {cartItems.map((item: CartItem, index: number) => (
          <>
            <div key={index} className='flex gap-2 items-center justify-between'>
              <img src={item.thumbnail} alt={item.title} className='w-10 h-10 rounded-lg object-cover' />
              <p className='text-sm text-black text-center'>{item.title}</p>
              <button className='bg-[#6100FF] rounded-2xl my-2 px-2 w-min text-white cursor-text'>
                {item.quantity}
              </button>
            </div>
            {index < cartItems.length - 1 && <hr className='bg-gray-400 border-0 h-px px-4 mx-4' />}
          </>
        ))}
        <button className='bg-black text-white w-full py-2 mt-2 rounded-3xl' onClick={() => router.push('/cart')}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartModal;
