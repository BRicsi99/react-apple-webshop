import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import OAuth from "../components/OAuth";
import { IoIosArrowForward, IoMdEye } from 'react-icons/io';
import { FaLock, FaUser } from 'react-icons/fa';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        router.push('/');
      }
    } catch (error) {
      toast.error('Bad User Credentials');
    }
  };

  return (
    <>
      <div className='m-4'>
        <header>
          <p className='text-3xl font-extrabold mb-2'>Welcome</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <div className='relative'>
              <input
                type='email'
                className='shadow-[rgba(0,0,0,0.11)] h-12 w-full text-base px-12 py-0 rounded-[3rem] border-0 bg-white my-4'
                placeholder='Email'
                id='email'
                value={email}
                onChange={onChange}
              />
              <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none'>
                <FaUser />
              </div>
            </div>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='shadow-[rgba(0,0,0,0.11)] h-12 w-full text-base px-12 py-0 rounded-[3rem] border-0 bg-white my-4'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />
              <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none'>
                <FaLock />
              </div>
              <div className='absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer'>
                <IoMdEye size={24} alt='showPassword' onClick={() => setShowPassword(prevState => !prevState)} />
              </div>
            </div>

            <Link href='/forgot-password' className='cursor-pointer text-[#6100FF] font-semibold text-right'>
              Forgot Password
            </Link>
            <div className='flex justify-center mt-12'>
              <button className='flex items-center'>
                <p className='cursor-pointer text-2xl font-bold'>Sign In</p>
                <div className='flex justify-center items-center w-10 h-10 bg-[#6100FF] rounded-[50%] ml-4'>
                  <IoIosArrowForward fill='#ffffff' size={24} />
                </div>
              </button>
            </div>
          </form>
          {/*<OAuth/>*/}

          <div className='flex justify-center items-center mt-6'>
            <Link href='/signup' className='text-[#6100FF] font-semibold text-center mt-16 mb-12'>
              Sign Up Instead
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignIn;
