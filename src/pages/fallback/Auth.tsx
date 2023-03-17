import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import useAuthModals from '@src/hooks/useAuthModals';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { ModalComponent } = useAuthModals({
    defaultToggle: true,
    onClose: () => navigate(-1)
  });
  return <ModalComponent />;
};

export default Auth;
