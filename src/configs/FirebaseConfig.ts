import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyBiN2BkR5RlgWKdaRa-psRzFCgPZ265zis',
  authDomain: 'athathy-766b1.firebaseapp.com',
  storageBucket: 'athathy-766b1.appspot.com',
  messagingSenderId: '685790667408'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
