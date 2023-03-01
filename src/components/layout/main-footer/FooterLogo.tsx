import LogoImage from '@src/assets/images/logos/LOGO1.png';

const FooterLogo = (): JSX.Element => {
  return (
    <div className="flex flex-col place-items-center gap-y-5">
      <img className="w-20 h-20" src={LogoImage} alt="Logo" loading="lazy" />
      <p className="text-white text-2xl font-bold">ATHATHY</p>
    </div>
  );
};

export default FooterLogo;
