import { Modal, Spin } from 'antd';
import { useState } from 'react';
import SignInForm from '@src/components/forms/SignInForm';
import SignInMethods from '../shared/SignInMethods';

interface SignInModalProps {
  onSignUpRedirect: () => void;
  onForgotPasswordRedirect: () => void;
  onClose?: () => void;
}

interface SignInModalResponse {
  ModalComponent: (args: SignInModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
}
const SignInModal = ({
  onSubmit
}: {
  onSubmit?: () => void;
}): SignInModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    FormComponent: SignInFormComponent,
    onSubmit: onSignInFormSubmit,
    isSubmitting: isSignInFormSubmitting
  } = SignInForm({
    onSubmit: () => {
      setIsModalVisible(false);
      onSubmit && onSubmit();
    }
  });

  const ModalComponent = ({
    onForgotPasswordRedirect,
    onSignUpRedirect,
    onClose
  }: SignInModalProps) => (
    <Modal
      className='!w-[38rem]'
      centered={true}
      open={isModalVisible}
      confirmLoading={isSignInFormSubmitting}
      onCancel={() => {
        setIsModalVisible(false);
        onClose && onClose();
      }}
      footer={null}
    >
      {isSignInFormSubmitting && <Spin className='!m-auto !w-full !h-full' />}
      <div
        className={`!font-PlusJakartaSans flex flex-col justify-center gap-y-5 w-full h-full text-[#333333] p-0 md:py-3 ${
          isSignInFormSubmitting && 'hidden'
        }`}
      >
        <div className='flex flex-col items-center gap-y-3 text-center'>
          <h4 className='text-3xl font-medium'>Welcome back!</h4>
          <h1 className='font-bold text-4xl'> Sign in to your account </h1>
          <p className='text-2xl'>
            Don't have an account?{' '}
            <span
              className='text-turkishRose cursor-pointer'
              onClick={() => {
                setIsModalVisible(false);
                onSignUpRedirect();
              }}
            >
              Sign up
            </span>
          </p>
        </div>
        <SignInFormComponent />
        <button
          onClick={() => {
            setIsModalVisible(false);
            onForgotPasswordRedirect();
          }}
          type='button'
          className='text-turkishRose font-semibold text-2xl'
        >
          Forgot your password?
        </button>
        <SignInMethods onSubmit={() => setIsModalVisible(false)} />
        <button
          onClick={onSignInFormSubmit}
          type='button'
          className='border-t-2 w-full text-turkishRose font-bold text-2xl pt-4 md:pt-7'
        >
          SIGN IN
        </button>
      </div>
    </Modal>
  );

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show)
  };
};

export default SignInModal;
