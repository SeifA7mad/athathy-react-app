import { Divider } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface FiltersInterface {
  minPrice: number;
  maxPrice: number;
  ratings: number[];
  categories: string[];
  locations: string[];
}

const Filters = () => {
  const [queryParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const setFilter = (
    dataKey: keyof FiltersInterface,
    value: FiltersInterface[keyof FiltersInterface]
  ) => {
    // if the query param already exist
    if (queryParams.get(dataKey)) {
      // split the values on ','
      const splitValues = queryParams.get(dataKey)?.split(',');
      // if there are more than 1 value in the split array
      if (splitValues && splitValues.length > 1) {
        // concat the new values with the old values in a set to remove duplicates
        queryParams.set(dataKey, [
          ...new Set(splitValues.concat(value as any))
        ] as any);
      } else {
        // if not set (override) the existing value
        queryParams.set(dataKey, value as any);
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
    </section>
  );
};

export default Filters;
