import { SvgProps } from '@src/types/PropsTypes';

const EditSvg = ({ className }: SvgProps) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M2 18.0004H3.4L12.025 9.37539L10.625 7.97539L2 16.6004V18.0004ZM16.3 7.92539L12.05 3.72539L14.875 0.900391L19.1 5.12539L16.3 7.92539ZM0 20.0004V15.7504L10.6 5.15039L14.85 9.40039L4.25 20.0004H0ZM11.325 8.67539L10.625 7.97539L12.025 9.37539L11.325 8.67539Z'
        fill='black'
      />
    </svg>
  );
};

export default EditSvg;
