import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import useAuthModals from '@src/hooks/useAuthModals';
import { useNavigate, useParams } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { path } = useParams();

  let redirectTo = path;

  if (path?.includes(',')) {
    redirectTo = path.split(',').join('/');
  }

  const { ModalComponent } = useAuthModals({
    defaultToggle: true,
    onSubmit: () =>
      navigate(
        redirectTo !== 'undefined'
          ? `${APP_PREFIX_PATH}/${redirectTo}`
          : `${APP_PREFIX_PATH}/`,
        {
          replace: true
        }
      ),
    onClose: () =>
      navigate(`${APP_PREFIX_PATH}/`, {
        replace: true
      })
  });
  return <ModalComponent />;
};

export default Auth;
