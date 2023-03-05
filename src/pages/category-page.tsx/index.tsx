import { Route, Routes } from 'react-router-dom';
import Category from './Category';

const index = () => {
  return (
    <Routes>
      <Route path="*" element={<Category />} />
      <Route path=":id" element={<Category />} />
    </Routes>
  );
};

export default index;
