import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  
  return (
    <>
      <div className='container flex items-center p-4 mx-auto justify-center'>
        <main>
          <h1 className='font-mono text-xl code'>
            Welcome to <span className='text-purple-700'>Nextjs</span>,{' '}
            <span className='text-indigo-700'>TailwindCSS</span> and <span className='text-gray-700'>TypeScript</span>
          </h1>
          <p className='text-2xl font-bold underline'>Hello world!</p>
          <div className='mb-8 flex items-center justify-center'>
            <button
              onClick={() => {
                logOut();
                router.push('/');
              }}
              className='rounded-md bg-green-600 px-10 py-3 text-white shadow-sm hover:bg-green-700'
            >
              Logout
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
