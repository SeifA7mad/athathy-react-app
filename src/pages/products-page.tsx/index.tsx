import Filters from '@src/components/page-content/products/filters.tsx';
import ListingLayout from '@src/components/page-content/products/listing/ListingLayout';
import { Route, Routes } from 'react-router-dom';

const ProductsPage = () => {
  return (
    <div className="w-full h-full grid grid-cols-[15.5rem_1fr] gap-x-10">
      <Filters />
      <Routes>
        <Route path="*" element={<div>ProductsPage</div>} />
        <Route
          path=":categoryId"
          element={
            <ListingLayout title="Search for">
              <div>ProductsPage</div>
            </ListingLayout>
          }
        />
        <Route path="search/:searchText" element={<div>ProductsPage</div>} />
      </Routes>
    </div>
  );
};

export default ProductsPage;
