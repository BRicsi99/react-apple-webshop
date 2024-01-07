import { FormDataCopyProperties, FormDataProperties, UserType } from '@/models/model';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase.config';

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null, name: null });
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
          name: user.displayName,
        });
      } else {
        setUser({ email: null, uid: null, name: null });
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  // Sign up the user
  const signUp = async (formData: FormDataProperties) => {
    const { ...allData } = formData;
    const userCredential = await createUserWithEmailAndPassword(auth, allData.email, allData.password);

    const user = userCredential.user;

    updateProfile(auth.currentUser!, {
      displayName: allData.name,
    });
    const formDataCopy: FormDataCopyProperties = { ...formData, timestamp: serverTimestamp() };
    delete formDataCopy['password'];

    await setDoc(doc(db, 'users', user.uid), formDataCopy);
  };

  // Login the user
  const logIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  // Logout the user
  const logOut = async () => {
    setUser({ email: null, uid: null, name: null });
    return await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>{loading ? null : children}</AuthContext.Provider>
  );
};
