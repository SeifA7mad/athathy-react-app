import { SvgProps } from '@src/types/PropsTypes';

const ProfileSvg = ({ className }: SvgProps) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle cx='12' cy='8' r='4.75' stroke='#997973' strokeWidth='1.5' />
      <path
        d='M6 21C6 21 6 19.75 6 18.5C6 17.25 8.24914 16 12 16C15.7509 16 18 17.25 18 18.5C18 20.375 18 21 18 21'
        stroke='#997973'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ProfileSvg;
