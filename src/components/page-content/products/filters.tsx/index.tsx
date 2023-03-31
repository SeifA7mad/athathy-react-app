import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { Divider } from 'antd';
import MultipleOptions from './MultipleOptions';
import { fetchMainCategories } from '@src/services/CategoryService';
import RateOptions from './RateOptions';
import { fetchActiveCities } from '@src/services/CityService';
import PriceOptions from './PriceOptions';
import useQueryParams from '@src/hooks/useQueryParams';
import { useLocation } from 'react-router-dom';

const Filters = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const location = useLocation();

  let showCategoryFilter = true;

  if (!location.pathname.includes('search')) {
    showCategoryFilter = false;
  }

  return (
    <section className='hidden w-full h-full bg-white py-16 pl-6 pr-3 lg:flex flex-col gap-y-7'>
      <h1 className={`text-turkishRose font-bold text-3xl`}>Filters</h1>
      <Divider className='!m-0 !min-w-0 !w-4/5 border-turkishRose rounded' />
      <PriceOptions
        setFilter={setQueryParams}
        dataKey={['priceFrom', 'priceTo']}
        defaultMinValue={queryParams.get('priceFrom') || undefined}
        defaultMaxValue={queryParams.get('priceTo') || undefined}
      />
      <RateOptions
        setFilter={setQueryParams}
        dataKey='ratings'
        defaultValues={queryParams.get('ratings') || undefined}
      />
      <Divider className='!m-0 !min-w-0 !w-4/5 border-sauvignon rounded' />
      {showCategoryFilter && (
        <>
          <MultipleOptions
            dataKey='categoryId'
            queryKey={QueriesKeysEnum.CATEGORIES}
            setFilter={setQueryParams}
            title='Categories'
            fetchOptions={fetchMainCategories}
            defaultValues={queryParams.get('categoryId') || undefined}
          />

          <Divider className='!m-0 !min-w-0 !w-4/5 border-sauvignon rounded' />
        </>
      )}
      <MultipleOptions
        dataKey='cityId'
        queryKey={QueriesKeysEnum.CITIES}
        setFilter={setQueryParams}
        title='Locations'
        fetchOptions={fetchActiveCities}
        defaultValues={queryParams.get('cityId') || undefined}
      />
    </section>
  );
};

export default Filters;
