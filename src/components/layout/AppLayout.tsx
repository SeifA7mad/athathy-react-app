import AppHeader from './main-header/AppHeader';
import CategoriesNavigation from './CategoriesNavigation';
import AppFooter from './main-footer/AppFooter';

const AppLayout = ({
  children
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <header className='w-full sticky top-0 z-30 shadow-xl'>
        <AppHeader />
        <nav>
          <CategoriesNavigation />
        </nav>
      </header>
      <main>{children}</main>
      <footer className='w-full mt-16'>
        <AppFooter />
      </footer>
    </>
  );
};

export default AppLayout;
