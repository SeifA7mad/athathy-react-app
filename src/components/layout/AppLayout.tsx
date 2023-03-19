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
      <header>
        <AppHeader />
      </header>
      <main>
        <nav className='w-full sticky top-0 z-30'>
          <CategoriesNavigation />
        </nav>
        {children}
      </main>
      <footer className='w-full h-[40rem]'>
        <AppFooter />
      </footer>
    </>
  );
};

export default AppLayout;
