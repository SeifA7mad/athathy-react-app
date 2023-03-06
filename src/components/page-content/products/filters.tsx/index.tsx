import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { Divider } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import MultipleOptions from './MultipleOptions';
import { fetchMainCategories } from '@src/services/CategoryService';
import RateOptions from './RateOptions';
import { fetchActiveCities } from '@src/services/CityService';
export interface FiltersInterface {
  minPrice: number;
  maxPrice: number;
  ratings: number[];
  categories: string[];
  locations: string[];
}

export type setFilterFunction = (
  dataKey: keyof FiltersInterface,
  value: any
) => void;

const Filters = () => {
  const [queryParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const setFilter: setFilterFunction = (
    dataKey: keyof FiltersInterface,
    value: any
  ) => {
    // if the query param already exist
    if (queryParams.get(dataKey)) {
      if (value?.length === 0) {
        queryParams.delete(dataKey);
      } else {
        queryParams.set(dataKey, value);
      }
    } else {
      // if new append the new value
      queryParams.append(dataKey, value as any);
    }
    navigate({
      pathname: location.pathname,
      search: queryParams.toString()
    });
  };

  return (
    <section className="w-full h-full bg-white py-16 px-6 flex flex-col gap-y-7">
      <h1 className={`text-turkishRose font-bold text-3xl`}>Filters</h1>
      <Divider className="!m-0 !min-w-0 !w-4/5 border-turkishRose rounded" />

      <RateOptions
        setFilter={setFilter}
        dataKey="ratings"
        defaultValues={queryParams.get('ratings') || undefined}
      />
      <Divider className="!m-0 !min-w-0 !w-4/5 border-sauvignon rounded" />
      <MultipleOptions
        dataKey="categories"
        queryKey={QueriesKeysEnum.CATEGORIES}
        setFilter={setFilter}
        title="Categories"
        fetchOptions={fetchMainCategories}
        defaultValues={queryParams.get('categories') || undefined}
      />
      <Divider className="!m-0 !min-w-0 !w-4/5 border-sauvignon rounded" />
      <MultipleOptions
        dataKey="locations"
        queryKey={QueriesKeysEnum.CITIES}
        setFilter={setFilter}
        title="Locations"
        fetchOptions={fetchActiveCities}
        defaultValues={queryParams.get('categories') || undefined}
      />
    </section>
  );
};

export default Filters;
