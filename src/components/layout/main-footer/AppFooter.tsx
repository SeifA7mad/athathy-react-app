import ContactInfo from './ContactInfo';
import FooterLogo from './FooterLogo';
import FooterNavigation from './FooterNavigation';

const AppFooter = (): JSX.Element => {
  return (
    <section className='w-full h-full bg-vividBlue flex flex-col gap-y-8 justify-between py-7'>
      <div className='flex gap-y-14 lg:gap-0 flex-col items-start pl-8 lg:pl-32'>
        <FooterLogo />
        <div className='flex flex-wrap gap-y-8 justify-between w-11/12'>
          <ContactInfo />
          <FooterNavigation />
        </div>
      </div>
      <p className='text-xl text-white font-normal pl-4 lg:pl-32 mt-auto'>
        © {new Date().getFullYear()} All rights reserved.{' '}
      </p>
    </section>
  );
};

export default AppFooter;
