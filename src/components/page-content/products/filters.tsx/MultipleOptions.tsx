import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { useQuery } from '@tanstack/react-query';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { FiltersInterface, setFilterFunction } from '.';

interface MultipleOptionsProps {
  title: string;
  dataKey: keyof FiltersInterface;
  queryKey: QueriesKeysEnum;
  fetchOptions: any;
  setFilter: setFilterFunction;
  defaultValues?: string;
}

const MultipleOptions = ({
  title,
  dataKey,
  queryKey,
  fetchOptions,
  setFilter,
  defaultValues
}: MultipleOptionsProps) => {
  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchOptions,
    select(data: any) {
      return data.map((item: { name: any; id: any }) => ({
        label: item.name,
        value: item.id
      }));
    },
    initialData: undefined
  });

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setFilter(dataKey, checkedValues);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <h4 className="font-bold text-xl text-OuterSpace">{title}</h4>
      {data && (
        <Checkbox.Group
          className="flex flex-col gap-y-2 font-medium text-OuterSpace text-sm"
          options={data}
          onChange={onChange}
          value={defaultValues?.split(',') || []}
        />
      )}
    </div>
  );
};

export default MultipleOptions;
