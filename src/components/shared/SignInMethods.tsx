import FacebookSvg from '@src/assets/svg/FacebookSvg';
import GoogleSvg from '@src/assets/svg/GoogleSvg';
import {
  auth,
  facebookProvider,
  googleProvider
} from '@src/configs/FirebaseConfig';
import { useAppDispatch } from '@src/hooks/redux-hook';
import { register } from '@src/services/CustomerService';
import { userActions } from '@src/store-redux/slices/user-slice';
import { notification } from 'antd';
import {
  AuthErrorCodes,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';

interface SignInMethodsProps {
  className?: string;
  SigningUp?: boolean;
  onSubmit?: () => void;
}

const buttonClassName = `py-4 px-5 bg-[#99797326] rounded-lg flex justify-center items-center gap-x-4 text-xl font-medium`;

const SignInMethods = ({
  className,
  SigningUp,
  onSubmit
}: SignInMethodsProps) => {
  const dispatch = useAppDispatch();

  const onGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (!credential) {
        throw new Error('Sign in failed');
      }

      const token = credential.accessToken;

      if (!token) {
        throw new Error('Sign in failed');
      }

      const user = result.user;

      if (!!SigningUp) {
        console.log('register');
        await register({
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ')[1] || '',
          token: token
        });
      }

      dispatch(
        userActions.login({
          accessToken: token,
          displayName: user.displayName || '',
          email: user.email || ''
        })
      );
      onSubmit?.();
    } catch (error: any) {
      console.error('Failed:', 'error');
      if (error?.response?.status === 409) {
        onSubmit?.();
        return;
      }

      signOut(auth);

      if (
        error?.code === 'auth/cancelled-popup-request' ||
        error?.code === 'auth/popup-closed-by-user'
      ) {
        return;
      }

      notification.error({
        message: error?.response?.data?.title || error.message
      });
    }
  };

  const onFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);

      const credential = FacebookAuthProvider.credentialFromResult(result);

      if (!credential) {
        throw new Error('Sign in failed');
      }

      const token = credential.accessToken;

      if (!token) {
        throw new Error('Sign in failed');
      }

      const user = result.user;

      if (!!SigningUp) {
        await register({
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ')[1] || '',
          token: token
        });
      }

      onSubmit?.();
    } catch (error: any) {
      console.error('Failed:', 'error');
      if (error?.response?.status === 409) {
        onSubmit?.();
        return;
      }

      signOut(auth);

      if (
        error?.code === 'auth/cancelled-popup-request' ||
        error?.code === 'auth/popup-closed-by-user'
      ) {
        return;
      }

      notification.error({
        message: error?.response?.data?.title || error.message
      });
    }
  };

  return (
    <div className={`w-full flex justify-center gap-x-8 ${className}`}>
      <button
        className={buttonClassName}
        type='button'
        onClick={onGoogleSignIn}
      >
        <GoogleSvg className='!w-7 !h-7' />
        {!SigningUp ? 'Sign in' : 'Sign up'} with Google
      </button>
      <button
        className={buttonClassName}
        type='button'
        onClick={onFacebookSignIn}
      >
        <FacebookSvg className='!w-7 !h-7' />
        {!SigningUp ? 'Sign in' : 'Sign up'} with Facebook
      </button>
    </div>
  );
};

export default SignInMethods;
