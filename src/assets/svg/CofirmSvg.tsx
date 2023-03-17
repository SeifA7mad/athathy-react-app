import { SvgProps } from '@src/types/PropsTypes';

const ConfirmSvg = ({ className }: SvgProps) => {
  return (
    <svg
      width='43'
      height='44'
      viewBox='0 0 43 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M21.5 2L26.753 5.832L33.256 5.82L35.253 12.008L40.521 15.82L38.5 22L40.521 28.18L35.253 31.992L33.256 38.18L26.753 38.168L21.5 42L16.247 38.168L9.744 38.18L7.747 31.992L2.479 28.18L4.5 22L2.479 15.82L7.747 12.008L9.744 5.82L16.247 5.832L21.5 2Z'
        fill='#30B700'
        stroke='#30B700'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.5 22L19.5 27L29.5 17'
        stroke='white'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ConfirmSvg;
