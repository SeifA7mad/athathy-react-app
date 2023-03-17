import { userActions } from '@src/store-redux/slices/user-slice';
import { store } from '@src/store-redux/store';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     const userToken = await user.getIdToken();
//     store.dispatch(
//       userActions.login({
//         accessToken: userToken,
//         displayName: user.displayName || '',
//         email: user.email || ''
//       })
//     );
//   } else {
//     store.dispatch(userActions.logout());
//   }
// });
