import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export interface FiltersInterface {
  minPrice: number;
  maxPrice: number;
  ratings: number[];
  categories: string[];
  locations: string[];
  sortBy: string;
}

export type setQueryParamsType = (
  dataKey: keyof FiltersInterface,
  value: any
) => void;

const useQueryParams = () => {
  const [queryParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const setQueryParams: setQueryParamsType = (
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

  return {
    setQueryParams,
    queryParams
  }
}

export default useQueryParams