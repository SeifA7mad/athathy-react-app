import SignInModal from '@src/components/modals/SignInModal';
import SignUpModal from '@src/components/modals/SignUpModal';
import { useEffect } from 'react';

interface AuthModalsProps {
  defaultToggle?: boolean;
  onClose?: () => void;
}

const useAuthModals = ({ defaultToggle = false, onClose }: AuthModalsProps) => {
  const { toggleModal: SignInToggle, ModalComponent: SignInModalComponent } =
    SignInModal({
      onClose
    });

  const { toggleModal: SignUpToggle, ModalComponent: SignUpModalComponent } =
    SignUpModal({
      onClose
    });

  useEffect(() => {
    if (defaultToggle) {
      SignInToggle(true);
    }
  });

  const ModalComponent = () => {
    return (
      <>
        <SignInModalComponent
          onSignUpRedirect={() => SignUpToggle(true)}
          onForgotPasswordRedirect={() => {}}
          onClose={onClose}
        />
        <SignUpModalComponent
          onSignInRedirect={() => SignInToggle(true)}
          onClose={onClose}
        />
      </>
    );
  };

  return {
    ModalComponent,
    showModal: () => SignInToggle(true)
  };
};

export default useAuthModals;
