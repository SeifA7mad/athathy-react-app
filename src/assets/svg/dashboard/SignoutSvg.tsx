import { SvgProps } from '@src/types/PropsTypes';

const SignoutSvg = ({ className }: SvgProps) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={`w-5 h-5 fill-inherit ${className}`}
    >
      <path d='M16 13V11H7V8L2 12L7 16V13H16Z' />
      <path d='M20 3H11C9.897 3 9 3.897 9 5V9H11V5H20V19H11V15H9V19C9 20.103 9.897 21 11 21H20C21.103 21 22 20.103 22 19V5C22 3.897 21.103 3 20 3Z' />
    </svg>
  );
};

export default SignoutSvg;
