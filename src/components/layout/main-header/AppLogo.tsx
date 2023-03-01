import LogoImage from '@src/assets/images/logos/LOGO.png';

const AppLogo = (): JSX.Element => {
  return (
    <img className="w-20 h-20" src={LogoImage} alt="Logo" loading="lazy" />
  );
};

export default AppLogo;
