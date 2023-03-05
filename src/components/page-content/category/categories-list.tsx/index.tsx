import MainNavigationList from './MainNavigationList';
import SubNavigationList from './SubNavigationList';

interface CategoriesListProps {
  categoryId?: string;
}

const CategoriesList = ({ categoryId }: CategoriesListProps) => {
  return (
    <section className="w-full bg-white min-h-[32rem] flex gap-x-36 py-16 px-24">
      <MainNavigationList />
      <SubNavigationList categoryId={categoryId} />
    </section>
  );
};

export default CategoriesList;
