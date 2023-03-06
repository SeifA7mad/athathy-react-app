import { Checkbox, Rate } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

import { FiltersInterface, setFilterFunction } from '.';

interface RateOptionsProps {
  setFilter: setFilterFunction;
  dataKey: keyof FiltersInterface;
  defaultValues?: string;
}

const ratingsValues = [...new Array(5)].map((_, i) => ({
  value: `${i + 1}`,
  label: (
    <>
      <Rate disabled defaultValue={i + 1} />
      <span> {(i + 1).toFixed(1)}</span>
    </>
  )
}));

const RateOptions = ({
  dataKey,
  setFilter,
  defaultValues
}: RateOptionsProps) => {
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setFilter(dataKey, checkedValues);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h4 className="font-bold text-xl text-OuterSpace">Star Ratings</h4>
      <Checkbox.Group
        value={defaultValues?.split(',') || []}
        options={ratingsValues}
        onChange={onChange}
        className="flex flex-col-reverse font-medium text-OuterSpace text-sm"
      />
    </div>
  );
};

export default RateOptions;
