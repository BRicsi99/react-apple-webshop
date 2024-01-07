import { useRouter } from 'next/router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

function OAuth() {
  const router = useRouter();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // If user, doesnt exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      router.push('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  };

  return (
    <div className='flex flex-col items-center mt-8'>
      <p className='font-medium'> Sign {router.pathname === '/signup' ? 'up' : 'in'} with</p>
      <button className='cursor-pointer flex justify-center items-center w-12 h-12 bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.1)] m-4 p-3 rounded-[50%]' onClick={onGoogleClick}>
        <img className='w-full' src='/googleIcon.svg' alt='google' />
      </button>
    </div>
  );
}

export default OAuth;
