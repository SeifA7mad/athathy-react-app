import useAuthModals from '@src/hooks/useAuthModals';

const Auth = () => {
  const { ModalComponent } = useAuthModals({
    defaultToggle: true
    // onClose: () => navigate('/')
  });
  return <ModalComponent />;
};

export default Auth;
