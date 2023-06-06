import LeftArrowSvg from '@src/assets/svg/LeftArrowSvg';
import RightArrowSvg from '@src/assets/svg/RightArrowSvg';
import { useRef, useState } from 'react';

interface CarouselProps {
  images: string[];
  className?: string;
  mainImgClassName?: string;
  previewImgClassName?: string;
}

export default function Carousel(props: CarouselProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const imgPreviewRefs = useRef<HTMLImageElement[]>([]);

  const onImagePreviewClick = (index: number) => {
    setActiveImageIdx(index);
  };

  const onRightClick = () => {
    let newActiveImageIdx = activeImageIdx;
    if (activeImageIdx === props.images.length - 1) {
      newActiveImageIdx = 0;
    } else {
      newActiveImageIdx = activeImageIdx + 1;
    }
    imgPreviewRefs.current[newActiveImageIdx].scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
    setActiveImageIdx(newActiveImageIdx);
  };

  const onLeftClick = () => {
    let newActiveImageIdx = activeImageIdx;
    if (activeImageIdx === 0) {
      newActiveImageIdx = props.images.length - 1;
    } else {
      newActiveImageIdx = activeImageIdx - 1;
    }
    imgPreviewRefs.current[newActiveImageIdx].scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
    setActiveImageIdx(newActiveImageIdx);
  };

  return (
    <div className={`flex flex-col gap-2 ${props.className}`}>
      <img
        src={props.images[activeImageIdx]}
        className={`h-full object-contain ${props.mainImgClassName}`}
        alt=''
      />

      <div className='flex items-center justify-between gap-[.75rem] w-full px-1'>
        <button
          className='flex items-center justify-center text-turkishRose bg-[#F5F5F5] h-[2.9375rem] w-[2.9375rem] rounded-full shadow-[0px_2px_6px_0px_#00000040] shadow-firebrick/30'
          onClick={onLeftClick}
        >
          <LeftArrowSvg />
        </button>
        <div className='flex gap-2 overflow-x-auto w-3/4 scrollbar-hidden'>
          {props.images.map((image, index) => (
            <img
              src={image}
              ref={(el) =>
                (imgPreviewRefs.current[index] = el as HTMLImageElement)
              }
              onClick={() => onImagePreviewClick(index)}
              className={`w-28 h-20 object-contain ${props.previewImgClassName}`}
            />
          ))}
        </div>
        <button
          className='flex items-center justify-center text-turkishRose bg-[#F5F5F5] h-[2.9375rem] w-[2.9375rem] rounded-full shadow-[0px_2px_6px_0px_#00000040] shadow-firebrick/30'
          onClick={onRightClick}
        >
          <RightArrowSvg />
        </button>
      </div>
    </div>
  );
}
