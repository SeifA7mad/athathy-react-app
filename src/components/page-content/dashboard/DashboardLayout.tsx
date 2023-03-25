import { Divider } from 'antd';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sortingElements?: React.ReactNode;
  title: string;
}
const DashboardLayout = ({
  children,
  title,
  sortingElements
}: DashboardLayoutProps) => {
  return (
    <section className='w-11/12 mx-auto md:mx-0 max-w-6xl flex flex-col gap-y-10 mt-20 mb-20'>
      <div className='flex gap-x-4'>
        <div className='flex flex-col gap-y-4'>
          <h1 className='text-2xl font-bold text-gray40'>{title}</h1>
          <Divider className='!m-0 border-turkishRose border-2 !w-32' />
        </div>
        {sortingElements}
      </div>
      {children}
    </section>
  );
};

export default DashboardLayout;
