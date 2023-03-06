import { DEFAULT_PAGE_SIZE } from '@src/configs/QueriesConfig';
import { useState } from 'react';

interface PaginationProps {
  queryParams: URLSearchParams;
}

const usePagination = ({ queryParams }: PaginationProps) => {
  const [page, setPage] = useState<number>(1);

  if (!queryParams.get('page')) {
    queryParams.set('page', '1');
    queryParams.set('limit', DEFAULT_PAGE_SIZE.toString());
  }

  const jumpToPage = (page: number) => {
    queryParams.set('page', page.toString());
    setPage(page);
  };

  const nextPage = () => {
    jumpToPage(page + 1);
  };

  const prevPage = () => {
    jumpToPage(page - 1);
  };

  return {
    nextPage,
    prevPage,
    jumpToPage
  };
};

export default usePagination;
