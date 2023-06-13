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
      className='!w-[34.375rem] !h-[34.375rem] !rounded-[1.25rem] !overflow-hidden'
      centered={true}
      open={isModalVisible}
      confirmLoading={isSignInFormSubmitting}
      onCancel={() => {
        setIsModalVisible(false);
        onClose && onClose();
      }}
      prefixCls='ant-modal-signin'
      footer={null}
    >
      {isSignInFormSubmitting && <Spin className='!m-auto !w-full !h-full' />}
      <div
        className={`!font-PlusJakartaSans flex flex-col justify-center w-full h-full text-[#333333] p-0 ${
          isSignInFormSubmitting && 'hidden'
        }`}
      >
        <div className='flex flex-col items-center gap-y-[1.25rem] mt-[1.875rem] mb-[2.8125rem] text-center'>
          <div className='flex flex-col gap-[.3125rem]'>
            <h4 className='text-lg font-medium leading-[1.875rem]'>
              Welcome back!
            </h4>
            <h1 className='font-bold text-[1.75rem] leading-[1.875rem]'>
              Sign in to your account
            </h1>
          </div>
          <p className='text-base font-medium leading-[1.875rem]'>
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
        <div className='flex flex-col px-[3.125rem] gap-[1.5625rem] mb-[1.875rem]'>
          <SignInFormComponent />
          <div className='flex flex-col gap-y-[1.875rem]'>
            <button
              onClick={() => {
                setIsModalVisible(false);
                onForgotPasswordRedirect();
              }}
              type='button'
              className='text-turkishRose font-medium text-lg'
            >
              Forgot your password?
            </button>
            <SignInMethods onSubmit={() => setIsModalVisible(false)} />
          </div>
        </div>

        <button
          onClick={onSignInFormSubmit}
          type='button'
          className='border-t border-gray40 w-full text-turkishRose font-bold text-xl md:py-[1.1rem]'
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
