import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import useAuthModals from '@src/hooks/useAuthModals';
import { useNavigate, useParams } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { path } = useParams();
  const { ModalComponent } = useAuthModals({
    defaultToggle: true,
    onSubmit: () =>
      navigate(path ? `${APP_PREFIX_PATH}/${path}` : `${APP_PREFIX_PATH}/`),
    onClose: () => navigate(`${APP_PREFIX_PATH}/`)
  });
  return <ModalComponent />;
};

export default Auth;
