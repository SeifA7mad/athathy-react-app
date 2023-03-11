import { SvgProps } from '@src/types/PropsTypes';

const OrdersSvg = ({ className }: SvgProps) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      className={`w-5 h-5 fill-inherit ${className}`}
    >
      <path d='M2 20C1.45 20 0.979333 19.8043 0.588 19.413C0.196 19.021 0 18.55 0 18V2C0 1.45 0.196 0.979 0.588 0.587C0.979333 0.195667 1.45 0 2 0H10L16 6V10H14V7H9V2H2V18H8V20H2ZM14.3 12.525L15.375 13.6L11.5 17.45V18.5H12.55L16.425 14.65L17.475 15.7L13.175 20H10V16.825L14.3 12.525ZM17.475 15.7L14.3 12.525L15.75 11.075C15.9333 10.8917 16.1667 10.8 16.45 10.8C16.7333 10.8 16.9667 10.8917 17.15 11.075L18.925 12.85C19.1083 13.0333 19.2 13.2667 19.2 13.55C19.2 13.8333 19.1083 14.0667 18.925 14.25L17.475 15.7Z' />
    </svg>
  );
};

export default OrdersSvg;
