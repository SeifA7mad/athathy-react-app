import { SvgProps } from '@src/types/PropsTypes';

const ReturnSvg = ({ className }: SvgProps) => {
  return (
    <svg
      width='29'
      height='38'
      viewBox='0 0 29 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M7.75 14.8479H16.525C17.7781 14.8479 18.98 15.3584 19.8661 16.2672C20.7522 17.1759 21.25 18.4085 21.25 19.6937C21.25 20.9788 20.7522 22.2114 19.8661 23.1201C18.98 24.0289 17.7781 24.5394 16.525 24.5394H14.5M7.75 14.8479L11.8 10.6944M7.75 14.8479L11.8 19.0014M28 5.63076V37L21.25 34.231L14.5 37L7.75 34.231L1 37V5.63076C1 3.58538 2.4508 1.83352 4.4326 1.59723C11.1217 0.800924 17.8783 0.800924 24.5674 1.59723C26.5474 1.83352 28 3.58538 28 5.63076Z'
        stroke='#997973'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ReturnSvg;
