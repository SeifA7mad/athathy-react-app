import LogoImage from '@src/assets/images/logos/LOGO2.png';

const FooterLogo = (): JSX.Element => {
  return (
    <div className='flex flex-col place-items-center gap-y-[1.2769rem]'>
      <img
        className='w-[6.25rem] h-[4.2231rem]'
        src={LogoImage}
        alt='Logo'
        loading='lazy'
      />
      <p className='text-white text-2xl font-bold'>ATHATHY</p>
    </div>
  );
};

export default FooterLogo;
