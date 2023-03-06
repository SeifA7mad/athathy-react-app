import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { Divider } from 'antd';
import MultipleOptions from './MultipleOptions';
import { fetchMainCategories } from '@src/services/CategoryService';
import RateOptions from './RateOptions';
import { fetchActiveCities } from '@src/services/CityService';
import PriceOptions from './PriceOptions';
import useQueryParams from '@src/hooks/useQueryParams';

const Filters = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  return (
    <section className="hidden w-full h-full bg-white py-16 px-6 lg:flex flex-col gap-y-7">
      <h1 className={`text-turkishRose font-bold text-3xl`}>Filters</h1>
      <Divider className="!m-0 !min-w-0 !w-4/5 border-turkishRose rounded" />
      <PriceOptions
        setFilter={setQueryParams}
        dataKey={['minPrice', 'maxPrice']}
        defaultMinValue={queryParams.get('minPrice') || undefined}
        defaultMaxValue={queryParams.get('maxPrice') || undefined}
      />
      <RateOptions
        setFilter={setQueryParams}
        dataKey="ratings"
        defaultValues={queryParams.get('ratings') || undefined}
      />
      <Divider className="!m-0 !min-w-0 !w-4/5 border-sauvignon rounded" />
      <MultipleOptions
        dataKey="categories"
        queryKey={QueriesKeysEnum.CATEGORIES}
        setFilter={setQueryParams}
        title="Categories"
        fetchOptions={fetchMainCategories}
        defaultValues={queryParams.get('categories') || undefined}
      />
      <Divider className="!m-0 !min-w-0 !w-4/5 border-sauvignon rounded" />
      <MultipleOptions
        dataKey="locations"
        queryKey={QueriesKeysEnum.CITIES}
        setFilter={setQueryParams}
        title="Locations"
        fetchOptions={fetchActiveCities}
        defaultValues={queryParams.get('categories') || undefined}
      />
    </section>
  );
};

export default Filters;
