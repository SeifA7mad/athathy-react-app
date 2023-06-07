import { SvgProps } from '@src/types/PropsTypes';

export default function OfficeSvg({
  className,
  strokeColor
}: SvgProps & { strokeColor?: string }) {
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
        d='M9.99609 14.6771V12.1401'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M16.19 3.33057C17.88 3.33057 19.24 4.70057 19.24 6.39057V9.83057C16.78 11.2706 13.53 12.1406 9.99 12.1406C6.45 12.1406 3.21 11.2706 0.75 9.83057V6.38057C0.75 4.69057 2.12 3.33057 3.81 3.33057H16.19Z'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M13.4961 3.326V2.96C13.4961 1.74 12.5061 0.75 11.2861 0.75H8.70609C7.48609 0.75 6.49609 1.74 6.49609 2.96V3.326'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M0.775391 13.4834L0.964391 15.9924C1.09239 17.6834 2.50139 18.9904 4.19639 18.9904H15.7954C17.4904 18.9904 18.8994 17.6834 19.0274 15.9924L19.2164 13.4834'
        stroke={strokeColor ? strokeColor : '#444853'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
