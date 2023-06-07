import { Divider } from 'antd';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sortingElements?: React.ReactNode;
  title: string;
  pageAction?: React.ReactNode;
}
const DashboardLayout = ({
  children,
  title,
  sortingElements,
  pageAction
}: DashboardLayoutProps) => {
  return (
    <section className='w-11/12 mx-auto md:mx-0 flex flex-col gap-y-10 mt-10 mb-20'>
      <div className='flex gap-x-4'>
        <div className='flex w-11/12 flex-col gap-y-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-gray40'>{title}</h1>
            {pageAction && pageAction}
          </div>
          <Divider className='!m-0 border-turkishRose border-2 !w-40 !min-w-[10rem]' />
        </div>
        {sortingElements}
      </div>
      {children}
    </section>
  );
};

export default DashboardLayout;
