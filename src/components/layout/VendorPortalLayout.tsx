import AppFooter from './main-footer/AppFooter';

export default function VendorPortalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <footer className='w-full mt-16'>
        <AppFooter />
      </footer>
    </>
  );
}
