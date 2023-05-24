import usePagination from '@src/hooks/usePagination';
import useQueryParams from '@src/hooks/useQueryParams';
import { Divider, Pagination, Select } from 'antd';

interface ListingLayoutProps {
  title: string;
  children: React.ReactNode;
  pagination: ReturnType<typeof usePagination>;
  total?: number;
}

const sortOptions = [
  { value: 'Low To High', label: 'Sort by: Low To High' },
  { value: 'High To Low', label: 'Sort by: High To Low' },
  { value: 'Newest Arrivals', label: 'Sort by: Newest Arrivals' },
  { value: 'Featured', label: 'Sort by: Featured' },
  { value: 'Most Wishlisted', label: 'Sort by: Most Wishlisted' },
  { value: 'Best Selling Products', label: 'Sort by: Best Selling' }
];

const Heading = ({ title }: { title: string }) => {
  const { queryParams, setQueryParams } = useQueryParams();

  const handleChange = (value: string) => {
    setQueryParams('orderByPrice', value);
  };

  return (
    <div className='w-full flex justify-between'>
      <div className='flex flex-col gap-y-4'>
        <h1 className='text-2xl font-bold text-gray40'>{title}</h1>
        <Divider className='!m-0 !min-w-0 !border-[1px] border-turkishRose rounded' />
      </div>
      <Select
        className='relative flex justify-between text-center w-64 md:w-56'
        value={queryParams?.get('orderByPrice') || 'Newest Arrivals'}
        options={sortOptions}
        onChange={handleChange}
      />
    </div>
  );
};

const ListingLayout = ({
  title,
  pagination,
  children,
  total
}: ListingLayoutProps) => {
  const onChangePage = (page: number, pageSize?: number) => {
    pagination.jumpToPage(page);
  };

  return (
    <div className='w-11/12 pt-16 flex flex-col items-center gap-y-12 mx-auto'>
      <Heading title={title} />
      {children}
      <Pagination
        total={total || 0}
        showSizeChanger={false}
        hideOnSinglePage={true}
        responsive={true}
        showLessItems={true}
        onChange={onChangePage}
      />
    </div>
  );
};

export default ListingLayout;
