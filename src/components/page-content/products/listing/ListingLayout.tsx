import usePagination from '@src/hooks/usePagination';
import useQueryParams from '@src/hooks/useQueryParams';
import { Divider, Pagination, Select } from 'antd';

interface ListingLayoutProps {
  title: string;
  children: React.ReactNode;
  pagination: ReturnType<typeof usePagination>;
}

const sortOptions = [
  { value: 'featured', label: 'Sort by: Featured' },
  { value: 'newest', label: 'Sort by: Newest' }
];

const Heading = ({ title }: { title: string }) => {
  const { queryParams, setQueryParams } = useQueryParams();

  const handleChange = (value: string) => {
    setQueryParams('sortBy', value);
  };

  return (
    <div className="w-full flex justify-between">
      <div className="flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold text-gray40">{title}</h1>
        <Divider className="!m-0 !min-w-0 !border-[1px] border-turkishRose rounded" />
      </div>
      <Select
        className="relative flex justify-between text-center w-44"
        value={queryParams?.get('sortBy') || 'featured'}
        options={sortOptions}
        onChange={handleChange}
      />
    </div>
  );
};

const ListingLayout = ({ title, pagination, children }: ListingLayoutProps) => {
  const onChangePage = (page: number, pageSize?: number) => {
    pagination.jumpToPage(page);
  };

  return (
    <div className="w-11/12 pt-16 flex flex-col items-center gap-y-12 mx-auto">
      <Heading title={title} />
      {children}
      <Pagination
        total={85}
        showSizeChanger={false}
        responsive={true}
        showLessItems={true}
        onChange={onChangePage}
      />
    </div>
  );
};

export default ListingLayout;
