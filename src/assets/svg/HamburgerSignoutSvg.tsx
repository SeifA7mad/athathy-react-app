import { SvgProps } from '@src/types/PropsTypes';

type Props = SvgProps & {
  fillColor?: string;
};

export default function HamburgerSignoutSvg(props: Props) {
  return (
    <svg
      width='17'
      height='18'
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path
        d='M13.0165 6.18001V5.24701C13.0165 3.21201 11.3665 1.56201 9.33146 1.56201H4.45646C2.42246 1.56201 0.772461 3.21201 0.772461 5.24701V16.377C0.772461 18.412 2.42246 20.062 4.45646 20.062H9.34146C11.3705 20.062 13.0165 18.417 13.0165 16.388V15.445'
        stroke={`${props.fillColor ?? '#666666'}`}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M19.8096 10.812H7.76855'
        stroke={`${props.fillColor ?? '#666666'}`}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M16.8818 7.89673L19.8098 10.8117L16.8818 13.7277'
        stroke={`${props.fillColor ?? '#666666'}`}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
