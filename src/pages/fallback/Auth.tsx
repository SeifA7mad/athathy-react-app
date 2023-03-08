import useAuthModals from '@src/hooks/useAuthModals';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { ModalComponent } = useAuthModals({
    defaultToggle: true,
    onClose: () => navigate('/')
  });
  return <ModalComponent />;
};

export default Auth;
