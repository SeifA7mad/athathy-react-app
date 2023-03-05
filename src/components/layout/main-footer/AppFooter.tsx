import ContactInfo from './ContactInfo';
import FooterLogo from './FooterLogo';
import FooterNavigation from './FooterNavigation';

const AppFooter = (): JSX.Element => {
  return (
    <section className="w-full h-full bg-vividBlue flex flex-col justify-between py-7 mt-32 overflow-hidden">
      <div className="flex flex-col items-start gap-y-14 pl-8 lg:pl-32">
        <FooterLogo />
        <div className="flex gap-x-12 sm:gap-x-24 md:gap-x-48">
          <ContactInfo />
          <FooterNavigation />
        </div>
      </div>
      <p className="text-xl text-white font-normal pl-4 lg:pl-20 mt-auto">
        © {new Date().getFullYear()} All rights reserved.{' '}
      </p>
    </section>
  );
};

export default AppFooter;
