import { SvgProps } from '@src/types/PropsTypes';

export default function HeartSvg({ className }: SvgProps) {
  return (
    <svg
      width='26'
      height='24'
      viewBox='0 0 26 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M13.13 20.2873L13 20.4173L12.857 20.2873C6.682 14.6843 2.6 10.9793 2.6 7.22227C2.6 4.62227 4.55 2.67227 7.15 2.67227C9.152 2.67227 11.102 3.97227 11.791 5.74027H14.209C14.898 3.97227 16.848 2.67227 18.85 2.67227C21.45 2.67227 23.4 4.62227 23.4 7.22227C23.4 10.9793 19.318 14.6843 13.13 20.2873ZM18.85 0.0722656C16.588 0.0722656 14.417 1.12527 13 2.77627C11.583 1.12527 9.412 0.0722656 7.15 0.0722656C3.146 0.0722656 0 3.20527 0 7.22227C0 12.1233 4.42 16.1403 11.115 22.2113L13 23.9273L14.885 22.2113C21.58 16.1403 26 12.1233 26 7.22227C26 3.20527 22.854 0.0722656 18.85 0.0722656Z'
        fill='#444853'
      />
    </svg>
  );
}
