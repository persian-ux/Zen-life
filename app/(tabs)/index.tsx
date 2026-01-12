import SignUp from '@/components/zenlife/SignUp';
import React, { useEffect } from 'react';
import { auth } from '../../firebaseConfig';

export default function SignUpScreen() {
  useEffect(() => {
    console.log('Firebase Auth:', auth);
  }, []);

  return <SignUp />;
}
