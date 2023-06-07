import { SvgProps } from '@src/types/PropsTypes';

type Props = SvgProps & {
  fillColor?: string;
};

export default function HamburgerOrdersSvg(props: Props) {
  return (
    <svg
      width='17'
      height='18'
      viewBox='0 0 17 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path
        d='M1.99967 17.3333C1.54134 17.3333 1.14912 17.1702 0.823008 16.8441C0.496341 16.5175 0.333008 16.125 0.333008 15.6666V2.33329C0.333008 1.87496 0.496341 1.48246 0.823008 1.15579C1.14912 0.829681 1.54134 0.666626 1.99967 0.666626H8.66634L13.6663 5.66663V8.99996H11.9997V6.49996H7.83301V2.33329H1.99967V15.6666H6.99967V17.3333H1.99967ZM12.2497 11.1041L13.1455 12L9.91634 15.2083V16.0833H10.7913L14.0205 12.875L14.8955 13.75L11.3122 17.3333H8.66634V14.6875L12.2497 11.1041ZM14.8955 13.75L12.2497 11.1041L13.458 9.89579C13.6108 9.74301 13.8052 9.66663 14.0413 9.66663C14.2775 9.66663 14.4719 9.74301 14.6247 9.89579L16.1038 11.375C16.2566 11.5277 16.333 11.7222 16.333 11.9583C16.333 12.1944 16.2566 12.3888 16.1038 12.5416L14.8955 13.75Z'
        fill={`${props.fillColor ?? '#666666'}`}
      />
    </svg>
  );
}
