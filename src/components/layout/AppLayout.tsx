import AppHeader from './main-header/AppHeader';

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
      <main> {children} </main>
    </>
  );
};

export default AppLayout;
