import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import {
  FiltersInterface,
  setQueryParamsType
} from '@src/hooks/useQueryParams';

interface PopulatedMultipleOptionsProps {
  title: string;
  dataKey: keyof FiltersInterface;
  setFilter: setQueryParamsType;
  data: { id: string; value: string }[];
}

const PopulatedMultipleOptions = ({
  title,
  dataKey,
  setFilter,
  data
}: PopulatedMultipleOptionsProps) => {
  const populatedData = data.map((item) => ({
    label: item.value,
    value: item.id
  }));

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setFilter(dataKey, checkedValues);
  };

  return (
    <div className='flex flex-col gap-y-3'>
      <h4 className='font-bold text-xl text-OuterSpace'>{title}</h4>
      <Checkbox.Group
        className='flex flex-col flex-nowrap gap-y-2 font-medium text-OuterSpace text-sm max-h-[7rem] overflow-y-auto scrollbar'
        options={populatedData}
        onChange={onChange}
      />
    </div>
  );
};

export default PopulatedMultipleOptions;
