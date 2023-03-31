import { InputNumber, Slider } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useEffect, useState } from 'react';

import {
  FiltersInterface,
  setQueryParamsType
} from '@src/hooks/useQueryParams';

interface PriceOptionsProps {
  setFilter: setQueryParamsType;
  dataKey: [keyof FiltersInterface, keyof FiltersInterface];
  defaultMinValue?: string;
  defaultMaxValue?: string;
}

const PriceOptions = ({
  dataKey,
  setFilter,
  defaultMinValue,
  defaultMaxValue
}: PriceOptionsProps) => {
  const [minValue, setMinValue] = useState<number>(
    defaultMinValue ? parseInt(defaultMinValue) : 1
  );
  const [maxValue, setMaxValue] = useState<number>(
    defaultMaxValue ? parseInt(defaultMaxValue) : 10000
  );
  const onAfterChange = (values: [number, number]) => {
    setFilter(dataKey[0], values[0]);
    setFilter(dataKey[1], values[1]);
  };

  const onChange = (values: [number, number]) => {
    setMinValue(values[0]);
    setMaxValue(values[1]);
  };

  const onMinChange = (value: number) => {
    if (value) {
      setMinValue(value);
      setFilter(dataKey[0], value);
    }
  };

  const onMaxChange = (value: number) => {
    if (value) {
      setMaxValue(value);
      setFilter(dataKey[1], value);
    }
  };

  return (
    <div className='flex flex-col gap-y-3 max-w-[12rem]'>
      <h4 className='font-bold text-xl text-OuterSpace'>Price Range</h4>
      <Slider
        max={10000}
        onAfterChange={onAfterChange}
        onChange={onChange}
        range={{ draggableTrack: false }}
        // defaultValue={[minValue, maxValue]}
        min={1}
        value={[minValue, maxValue]}
      />
      <div className='flex gap-x-3'>
        <div className='flex flex-col'>
          <p className='text-sm font-medium text-turkishRose'>Min.</p>
          <label className='flex items-center gap-x-1 text-xs font-semibold text-whiteSmoke'>
            AED
            <InputNumber
              onChange={(value) => onMinChange(value as number)}
              className='w-16'
              min={1}
              value={minValue}
            />
          </label>
        </div>
        <div className='flex flex-col'>
          <p className='text-sm font-medium text-turkishRose'>Max.</p>
          <label className='flex items-center gap-x-1 text-xs font-semibold text-whiteSmoke'>
            AED
            <InputNumber
              onChange={(value) => onMaxChange(value as number)}
              className='w-16'
              min={0}
              value={maxValue}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PriceOptions;
