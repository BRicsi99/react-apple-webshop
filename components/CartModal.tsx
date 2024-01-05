import { useCart } from '@/context/CartContext';

interface CartModalProps {
  visible?: boolean;
}

const CartModal: React.FC<CartModalProps> = ({ visible }) => {
  if (!visible) return null;
  const { cartItems } = useCart();
  console.log(cartItems);

  return (
    <div className='bg-white w-56 absolute top-16 right-10 py-4 px-4 border-2 border-gray-400 rounded-xl'>
      <div className='flex flex-col gap-3'>
        {cartItems.map((item, index) => (
          <>
            <div key={index} className='flex gap-2 items-center justify-between'>
              <img src={item.thumbnail} alt={item.title} className='w-10 h-10 rounded-lg object-cover' />
              <p className='text-sm text-black'>{item.title}</p>
              <button className='bg-[#6100FF] rounded-2xl my-2 px-2 w-min text-white cursor-text'>
              {item.quantity}
              </button>
            </div>
            <hr className='bg-gray-400 border-0 h-px px-4 mx-4' />
          </>
        ))}
      </div>
    </div>
  );
};

export default CartModal;
