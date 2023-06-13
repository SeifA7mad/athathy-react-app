import { Modal, Spin } from 'antd';
import { useState } from 'react';
import SignUpForm from '../forms/SignUpForm';
import SignInMethods from '../shared/SignInMethods';

interface SignUpModalProps {
  onSignInRedirect: () => void;
  onClose?: () => void;
}

interface SignUpModalResponse {
  ModalComponent: (args: SignUpModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
}

const SignUpModal = ({
  onSubmit
}: {
  onSubmit?: () => void;
}): SignUpModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    FormComponent: SignUpFormComponent,
    onSubmit: onSignUpFormSubmit,
    isSubmitting
  } = SignUpForm({
    onSubmit: () => {
      setIsModalVisible(false);
      onSubmit && onSubmit();
    }
  });

  const ModalComponent = ({ onSignInRedirect, onClose }: SignUpModalProps) => (
    <Modal
      className='!w-[34.375rem] !rounded-[1.25rem] !overflow-hidden'
      centered={true}
      open={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
        onClose && onClose();
      }}
      footer={null}
      prefixCls='ant-modal-signin'
    >
      {isSubmitting && <Spin className='!m-auto !w-full !h-full' />}
      <div
        className={`!font-PlusJakartaSans flex flex-col justify-center w-full h-full text-[#333333] ${
          isSubmitting && 'hidden'
        }`}
      >
        <div className='flex flex-col items-center gap-y-3 text-center mt-[1.875rem] mb-[3.125rem]'>
          <h1 className='font-bold text-[1.75rem]'> Create an account </h1>
          <p className='text-base font-medium'>
            Already have an account?{' '}
            <span
              className='text-turkishRose cursor-pointer'
              onClick={() => {
                {
                  setIsModalVisible(false);
                  onSignInRedirect();
                }
              }}
            >
              Sign in
            </span>
          </p>
        </div>

        <div className='flex flex-col gap-y-[1.5625rem] px-[3.125rem] mb-[1.25rem]'>
          <SignUpFormComponent />
          <SignInMethods
            className='w-full justify-between'
            SigningUp={true}
            onSubmit={() => setIsModalVisible(false)}
          />
        </div>

        <button
          onClick={onSignUpFormSubmit}
          type='submit'
          className='border-t border-gray40 w-full text-turkishRose font-bold text-xl py-[1.25rem]'
        >
          CREATE AN ACCOUNT
        </button>
      </div>
    </Modal>
  );

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show)
  };
};

export default SignUpModal;
