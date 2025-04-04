import { SvgProps } from '@src/types/PropsTypes';

type Props = SvgProps & {
  stroke?: string;
};

export default function HamburgerMenuIconSvg({ className, stroke }: Props) {
  return (
    <svg
      width='23'
      height='18'
      viewBox='0 0 23 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M1 1H22'
        stroke={stroke ?? 'white'}
        stroke-width='2'
        stroke-linecap='round'
      />
      <path
        d='M1 9H22'
        stroke={stroke ?? 'white'}
        stroke-width='2'
        stroke-linecap='round'
      />
      <path
        d='M1 17H22'
        stroke={stroke ?? 'white'}
        stroke-width='2'
        stroke-linecap='round'
      />
    </svg>
  );
}
