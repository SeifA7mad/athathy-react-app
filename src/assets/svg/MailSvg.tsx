import { SvgProps } from '@src/types/PropsTypes';

const MailSvg = ({ className }: SvgProps) => {
  return (
    <svg
      width='20'
      height='16'
      viewBox='0 0 20 16'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM17 14H3C2.45 14 2 13.55 2 13V4L8.94 8.34C9.59 8.75 10.41 8.75 11.06 8.34L18 4V13C18 13.55 17.55 14 17 14ZM10 7L2 2H18L10 7Z'
        fill='#997973'
      />
    </svg>
  );
};

export default MailSvg;
