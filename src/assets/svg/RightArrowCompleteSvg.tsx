import { SvgProps } from '@src/types/PropsTypes';

type Props = SvgProps & {
  strokeColor?: string;
};

export default function RightArrowCompleteSvg({
  className,
  strokeColor
}: Props) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
    >
      <path
        d='M1.5 7C0.947715 7 0.5 7.44772 0.5 8C0.5 8.55228 0.947715 9 1.5 9L1.5 7ZM15.2071 8.70711C15.5976 8.31658 15.5976 7.68342 15.2071 7.29289L8.84315 0.928932C8.45262 0.538408 7.81946 0.538408 7.42893 0.928932C7.03841 1.31946 7.03841 1.95262 7.42893 2.34315L13.0858 8L7.42893 13.6569C7.03841 14.0474 7.03841 14.6805 7.42893 15.0711C7.81946 15.4616 8.45262 15.4616 8.84315 15.0711L15.2071 8.70711ZM1.5 9L14.5 9V7L1.5 7L1.5 9Z'
        fill={strokeColor ?? `#F5F5F5`}
      />
    </svg>
  );
}
