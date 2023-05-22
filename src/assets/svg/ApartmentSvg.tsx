import { SvgProps } from '@src/types/PropsTypes';

export default function ApartmentSvg({
  className,
  strokeColor
}: SvgProps & { strokeColor?: string }) {
  return (
    <svg
      width='17'
      height='22'
      viewBox='0 0 17 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M15.739 5.15344C15.739 2.40256 13.8583 1.2998 11.1506 1.2998H4.79167C2.16711 1.2998 1 2.35715 1 4.99976V12.4998V18.9998C1 19.7256 1.88627 20.5158 2.5 20.5158L6 20.5219V17.4998H10.5V20.5219L14 20.5158C14.6775 20.5219 15.739 19.7266 15.739 18.9998V5.15344Z'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M5 6H6'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M8 6H9'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M8 9H8.5H9'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M5 9H5.5H6'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M5 12H5.5H6'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M11 12H11.5H12'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M8 12H8.5H9'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M11 6H12'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M11 9H11.5H12'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
