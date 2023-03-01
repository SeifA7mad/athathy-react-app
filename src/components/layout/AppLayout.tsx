import AppHeader from './main-header/AppHeader';
import CategoriesNavigation from './main-header/CategoriesNavigation';

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
        <nav className="w-full sticky top-0">
          <CategoriesNavigation />
        </nav>
        {children}
      </main>
    </>
  );
};

export default AppLayout;
