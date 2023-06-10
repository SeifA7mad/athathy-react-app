import { NavLink } from 'react-router-dom';

import { MainCategoryType } from '@src/types/API/CategoryType';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { useQuery } from '@tanstack/react-query';
import * as CategoryService from '@src/services/CategoryService';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { useEffect, useState } from 'react';

interface CategoriesNavigationLinksProps {
  categories: MainCategoryType[];
}

interface CategoriesNavigationLinkItemProps {
  category: MainCategoryType;
}

const CategoriesNavigationLinkItem = ({
  category
}: CategoriesNavigationLinkItemProps) => {
  const [subcategoriesOverlayState, setSubcategoriesOverlayState] = useState({
    isShown: false,
    isHovered: false
  });

  const { data: categoryData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.CATEGORIES, category.id],
    queryFn: async () => CategoryService.fetchCategoryChildren(category.id),
    enabled: !!category.id,
    initialData: null
  });

  useEffect(() => {
    if (categoryData?.children?.length === 0) {
      setSubcategoriesOverlayState({ isShown: false, isHovered: false });
    }
  }, []);

  const onCategoryItemHoverIn = () => {
    if (categoryData?.children?.length === 0) {
      return;
    }
    setSubcategoriesOverlayState({ isShown: true, isHovered: false });
  };

  const onCategoryItemHoverOut = () =>
    setTimeout(() => {
      setSubcategoriesOverlayState((prevState) =>
        prevState.isHovered ? prevState : { isShown: false, isHovered: false }
      );
    }, 200);

  const onSubcategoriesOverlayHoverIn = () =>
    setSubcategoriesOverlayState((prevState) => ({
      ...prevState,
      isHovered: true
    }));

  const onSubcategoriesOverlayHoverOut = () =>
    setSubcategoriesOverlayState({
      isHovered: false,
      isShown: false
    });

  return (
    <li
      className='h-full'
      onPointerEnter={onCategoryItemHoverIn}
      onPointerLeave={onCategoryItemHoverOut}
    >
      <NavLink
        to={`${APP_PREFIX_PATH}/${RouteKeysEnum.products}/${category.name}/${category.id}`}
        className={({ isActive }) =>
          `font-medium h-full ${
            isActive ? 'text-turkishRose' : 'text-OuterSpace'
          } hover:text-turkishRose hover:border-b hover:border-turkishRose pb-[.7rem] transition duration-300 ease-in-out`
        }
      >
        {category.name?.toUpperCase()}
      </NavLink>

      {/* Subcategories Overlay */}
      {subcategoriesOverlayState.isShown && (
        <div
          onPointerEnter={onSubcategoriesOverlayHoverIn}
          onPointerLeave={onSubcategoriesOverlayHoverOut}
          className={`bg-[#F9F9F9] w-screen flex flex-wrap gap-x-[1.25rem] gap-y-[.9375rem] pt-[2.5rem] pb-[2.1875rem] px-[4.375rem] z-[30] absolute top-[6.875rem] left-0`}
        >
          {categoryData?.children.map((subcategory) => (
            <NavLink
              to={`${APP_PREFIX_PATH}/${RouteKeysEnum.products}/${subcategory.name}/${subcategory.id}`}
              onClick={() =>
                setSubcategoriesOverlayState({
                  isShown: false,
                  isHovered: false
                })
              }
            >
              <div className='flex items-center gap-x-[.625rem] bg-white rounded-[.3125rem] px-[.3125rem] py-[.625rem]'>
                <img
                  src={subcategory.image}
                  className='w-[2.5rem] h-[2.5rem] object-cover'
                />
                <h4 className='w-[8.75rem] text-base text-center truncate-text-2-lines whitespace-normal text-OuterSpace leading-[1.26rem]'>
                  {subcategory.name}
                </h4>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </li>
  );
};

const CategoriesNavigationLinks = ({
  categories
}: CategoriesNavigationLinksProps) => {
  return (
    <ul className='gap-3 text-xs flex items-center xl:text-sm 2xl:gap-6 2xl:text-base overflow-x-auto py-4 scrollbar'>
      {categories.map((category) => (
        <CategoriesNavigationLinkItem key={category.id} category={category} />
      ))}
    </ul>
  );
};

const CategoriesNavigation = () => {
  const { data: categoriesData } = useQuery({
    queryKey: [QueriesKeysEnum.MAIN_CATEGORIES],
    queryFn: async () => CategoryService.fetchMainCategories(),
    initialData: []
  });

  return (
    <section className='bg-white overflow-x-auto h-[2.8125rem] flex justify-center items-center gap-x-8 xl:gap-x-24 px-7 whitespace-nowrap overflow-hidden'>
      <CategoriesNavigationLinks categories={categoriesData} />
      {/* <Link
        to='https://vendor.athathy.ae'
        target='_blank'
        rel='noopener noreferrer'
        className='text-turkishRose font-semibold text-base xl:text-2xl ml-auto'
      >
        Become a partner
      </Link> */}
    </section>
  );
};

export default CategoriesNavigation;
