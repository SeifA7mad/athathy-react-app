import { Route, Routes } from 'react-router-dom';
import Category from './Category';
import TopCategories from './TopCategories';

const CategoryPage = () => {
  return (
    <Routes>
      {/* <Route path='*' element={<Category />} />
      <Route path=':id' element={<Category />} /> */}
      <Route path=':slug' element={<TopCategories />} />
    </Routes>
  );
};

export default CategoryPage;
