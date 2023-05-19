import { useState } from 'react';

interface Props {
  initialValue?: number;
  onChange?: (value: number) => void;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export default function AthathyInputNumber({
  min = 1,
  max = 1000,
  step = 1,
  ...props
}: Props) {
  const [value, setValue] = useState(props.initialValue || 1);

  const onAddHandler = () => {
    const newValue = value + step;
    if (newValue > max) return;
    setValue(newValue);
  };

  const onSubtractHandler = () => {
    const newValue = value - step;
    if (newValue < min) return;
    setValue(newValue);
  };

  return (
    <div className='flex bg-[#36170024] p-1 items-center justify-center rounded-[54px] h-10'>
      <button
        className='bg-white text-OuterSpace hover:bg-gray-50 w-8 h-8 rounded-full cursor-pointer outline-none'
        onClick={onSubtractHandler}
      >
        <span className='text-xl'>−</span>
      </button>
      <input
        type='number'
        className='athathy-input-number w-7 outline-none text-center text-OuterSpace bg-transparent font-semibold focus:outline-none'
        name={props.name}
        value={value}
        onChange={(e) => props.onChange}
        min={min}
        max={max}
      />
      <button
        className='bg-white text-OuterSpace hover:bg-gray-50 w-8 h-8 rounded-full cursor-pointer outline-none'
        onClick={onAddHandler}
      >
        <span className='text-xl'>+</span>
      </button>
    </div>
  );
}
