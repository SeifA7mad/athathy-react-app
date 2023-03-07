import { Modal, Spin } from 'antd';
import { useState } from 'react';
import SignInForm from '@src/components/forms/SignInForm';

interface SignInModalProps {
  onSignUpRedirect: () => void;
  onForgotPasswordRedirect: () => void;
}

interface SignInModalResponse {
  ModalComponent: (args: SignInModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
}

const SignInModal = (): SignInModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    FormComponent: SignInFormComponent,
    onSubmit: onSignInFormSubmit,
    isSubmitting: isSignInFormSubmitting
  } = SignInForm({
    onClose: () => setIsModalVisible(false)
  });

  const ModalComponent = ({
    onForgotPasswordRedirect,
    onSignUpRedirect
  }: SignInModalProps) => (
    <Modal
      className='!w-[52rem]'
      centered={true}
      open={isModalVisible}
      confirmLoading={isSignInFormSubmitting}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      {isSignInFormSubmitting && <Spin className='!m-auto !w-full !h-full' />}
      <div
        className={`flex flex-col justify-center gap-y-16 w-full h-full text-[#333333] p-0 md:p-10 md:pb-6 ${
          isSignInFormSubmitting && 'hidden'
        }`}
      >
        <div className='flex flex-col items-center gap-y-10 text-center'>
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
          onClick={onForgotPasswordRedirect}
          type='button'
          className='text-turkishRose font-semibold text-2xl'
        >
          Forgot your password?
        </button>
        <button
          onClick={onSignInFormSubmit}
          type='button'
          className='border-t-2 w-full text-turkishRose font-bold text-4xl pt-8 md:pt-14'
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
