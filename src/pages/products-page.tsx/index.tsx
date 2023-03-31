import Filters from '@src/components/page-content/products/filters.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import CategoryListing from './CategoryListing';
import SearchListing from './SearchListing';

const ProductsPage = () => {
  return (
    <div className='w-full h-full grid grid-cols-1 lg:grid-cols-[16.5rem_1fr] gap-x-10'>
      <Filters />
      <Routes>
        {/* <Route path="*" element={<Navigate to={'search/all'} />} /> */}
        <Route path=':categoryName/:categoryId' element={<CategoryListing />} />
        <Route path='search/:searchText' element={<SearchListing />} />
      </Routes>
    </div>
  );
};

export default ProductsPage;
