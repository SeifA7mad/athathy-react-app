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
      className='!w-[45rem]'
      centered={true}
      open={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
        onClose && onClose();
      }}
      footer={null}
    >
      {isSubmitting && <Spin className='!m-auto !w-full !h-full' />}
      <div
        className={`!font-PlusJakartaSans flex flex-col justify-center gap-y-10 w-full h-full text-[#333333] p-0 md:py-6 ${
          isSubmitting && 'hidden'
        }`}
      >
        <div className='flex flex-col items-center gap-y-5 text-center'>
          <h1 className='font-bold text-4xl'> Create an account </h1>
          <p className='text-2xl'>
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
        <SignUpFormComponent />
        <SignInMethods
          SigningUp={true}
          onSubmit={() => setIsModalVisible(false)}
        />
        <button
          onClick={onSignUpFormSubmit}
          type='submit'
          className='border-t-2 w-full text-turkishRose font-bold text-4xl pt-8 md:pt-14'
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
