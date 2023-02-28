const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <main> {children} </main>
    </>
  );
};

export default Layout;
