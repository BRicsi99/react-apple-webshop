import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import OAuth from "../components/OAuth";
import { IoIosArrowForward, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FaLock, FaUser } from 'react-icons/fa';
import { MdBadge } from 'react-icons/md';
import { useAuth } from '@/context/AuthContext';
import { FormDataProperties } from '@/models/model';

function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataProperties>({
    name: '',
    email: '',
    password: '',
  });
  const { ...allData } = formData;

  const { signUp } = useAuth();
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signUp(formData);
      toast.success('Successfully registered');
      router.push('/');
    } catch (error) {
      toast.error('Something went wrong with registration');
      console.log(error);
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
                type='text'
                className='shadow-[rgba(0,0,0,0.11)] h-12 w-full text-base px-12 py-0 rounded-[3rem] border-0 bg-white my-4'
                placeholder='Name'
                id='name'
                value={allData.name}
                onChange={onChange}
              />
              <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none'>
                <MdBadge />
              </div>
            </div>
            <div className='relative'>
              <input
                type='email'
                className='shadow-[rgba(0,0,0,0.11)] h-12 w-full text-base px-12 py-0 rounded-[3rem] border-0 bg-white my-4'
                placeholder='Email'
                id='email'
                value={allData.email}
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
                value={allData.password}
                onChange={onChange}
              />
              <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none'>
                <FaLock />
              </div>
              <div className='absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer'>
                {showPassword ? (
                  <IoMdEyeOff size={24} alt='showPassword' onClick={() => setShowPassword(prevState => !prevState)} />
                ) : (
                  <IoMdEye size={24} alt='showPassword' onClick={() => setShowPassword(prevState => !prevState)} />
                )}
              </div>
            </div>
            <div className='flex justify-center mt-12'>
              <button className='flex items-center'>
                <p className='cursor-pointer text-2xl font-bold'>Sign Up</p>
                <div className='flex justify-center items-center w-10 h-10 bg-[#6100FF] rounded-[50%] ml-4'>
                  <IoIosArrowForward fill='#ffffff' size={24} />
                </div>
              </button>
            </div>
          </form>
          {/*<OAuth/>*/}

          <div className='flex justify-center items-center mt-6'>
            <Link href='/signin' className='text-[#6100FF] font-semibold text-center mt-16 mb-12'>
              Sign In Instead
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignUp;
