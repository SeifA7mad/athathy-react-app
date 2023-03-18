import SignInModal from '@src/components/modals/SignInModal';
import SignUpModal from '@src/components/modals/SignUpModal';
import { useEffect } from 'react';

interface AuthModalsProps {
  defaultToggle?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
}

const useAuthModals = ({
  defaultToggle = false,
  onSubmit,
  onClose
}: AuthModalsProps) => {
  const { toggleModal: SignInToggle, ModalComponent: SignInModalComponent } =
    SignInModal({
      onSubmit
    });

  const { toggleModal: SignUpToggle, ModalComponent: SignUpModalComponent } =
    SignUpModal({
      onSubmit
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
