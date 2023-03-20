import LogoImage from '@src/assets/images/logos/LOGO.png';
import { Link } from 'react-router-dom';

const AppLogo = (): JSX.Element => {
  return (
    <Link to='/'>
      <img className='w-16 h-16' src={LogoImage} alt='Logo' loading='lazy' />
    </Link>
  );
};

export default AppLogo;
