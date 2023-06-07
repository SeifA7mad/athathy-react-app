import { SvgProps } from '@src/types/PropsTypes';

export default function SendOutlinedSvg(props: SvgProps) {
  return (
    <svg
      width='19'
      height='20'
      viewBox='0 0 19 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path
        d='M11.3856 9.97559L3.24824 10.0188L1.52425 2.53683C1.27736 1.4647 2.41631 0.60013 3.38043 1.12795L17.5096 8.85616C18.3929 9.33904 18.3873 10.6108 17.4991 11.0932L3.34475 18.781C2.37623 19.3065 1.2467 18.4439 1.50034 17.3729L3.24538 10.0174'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
