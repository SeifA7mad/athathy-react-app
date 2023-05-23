interface Props {
  value: number;
  setValue: (value: number) => void;
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
  const onAddHandler = () => {
    const newValue = props.value + step;
    if (newValue > max) return;
    props.setValue(newValue);
  };

  const onSubtractHandler = () => {
    const newValue = props.value - step;
    if (newValue < min) return;
    props.setValue(newValue);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    const newValue = Number(currentValue);
    if (newValue < min || newValue > max) return;
    props.setValue(newValue);
  };

  return (
    <div
      className={`flex bg-[#36170024] p-1 items-center justify-center rounded-[54px] h-10 ${props.className}`}
    >
      <button
        className={`bg-white text-OuterSpace hover:bg-gray-50 w-8 h-8 pb-1 rounded-full cursor-pointer outline-none
        disabled:cursor-not-allowed disabled:bg-[#36170024] ${props.buttonClassName}`}
        onClick={onSubtractHandler}
        disabled={props.value === min}
      >
        <span className='text-xl'>−</span>
      </button>
      <input
        type='number'
        className={`athathy-input-number w-7 outline-none text-center text-OuterSpace bg-transparent font-semibold focus:outline-none ${props.inputClassName}`}
        name={props.name}
        onChange={onChangeHandler}
        value={props.value}
        min={min}
        max={max}
      />
      <button
        className={`bg-white text-OuterSpace hover:bg-gray-50 w-8 h-8 pb-1 rounded-full cursor-pointer outline-none
        disabled:cursor-not-allowed disabled:bg-[#36170024] ${props.buttonClassName}`}
        onClick={onAddHandler}
        disabled={props.value === max}
      >
        <span className='text-xl'>+</span>
      </button>
    </div>
  );
}
