import { Modal } from 'antd';
import { useState } from 'react';
import SignUpForm from '../forms/SignUpForm';

interface SignUpModalProps {
  onSignInRedirect: () => void;
}

interface SignUpModalResponse {
  ModalComponent: (args: SignUpModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
}

const SignUpModal = (): SignUpModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    FormComponent: SignUpFormComponent,
    onSubmit: onSignUpFormSubmit,
    isSubmitting: isSignUpFormSubmitting
  } = SignUpForm();

  const ModalComponent = ({ onSignInRedirect }: SignUpModalProps) => (
    <Modal
      className="!w-[832px]"
      centered={true}
      open={isModalVisible}
      confirmLoading={isSignUpFormSubmitting}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <div className="flex flex-col justify-center gap-y-16 w-full h-full text-[#333333] p-0 md:p-10 md:pb-6">
        <div className="flex flex-col items-center gap-y-10 text-center">
          <h1 className="font-bold text-4xl"> Create an account </h1>
          <p className="text-2xl">
            Already have an account?{' '}
            <span
              className="text-turkishRose cursor-pointer"
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
        <button
          onClick={onSignUpFormSubmit}
          type="submit"
          className="border-t-2 w-full text-turkishRose font-bold text-4xl pt-8 md:pt-14"
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
