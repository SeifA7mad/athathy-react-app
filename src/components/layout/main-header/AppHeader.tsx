import AppSearchbox from '@src/components/forms/AppSearchbox';
import AppLogo from './AppLogo';
import AppSideMenu from './AppSideMenu';

const AppHeader = (): JSX.Element => {
  return (
    <section
      className={`flex justify-between px-7 items-center w-100 h-[7.5rem] bg-turkishRose`}
    >
      <AppLogo />
      <div className="flex justify-between items-center w-3/4 gap-x-16">
        <AppSearchbox
          className={`w-9/12 max-w-4xl h-12 hidden md:block`}
          inputClassName="text-lg md:text-base rounded-lg"
        />
        <AppSideMenu />
      </div>
    </section>
  );
};

export default AppHeader;
