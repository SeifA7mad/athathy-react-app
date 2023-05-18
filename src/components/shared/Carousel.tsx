import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';

interface CarouselProps {
  images: string[];
}

export default function Carousel(props: CarouselProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const imgPreviewRefs = useRef<HTMLImageElement[]>([]);

  const onImagePreviewClick = (index: number) => {
    imgPreviewRefs.current[activeImageIdx].scrollIntoView({
      behavior: 'smooth'
    });
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
      behavior: 'smooth'
    });
    setActiveImageIdx(newActiveImageIdx);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='h-60 flex items-center justify-center bg-[#F5F5F5]'>
        <img
          src={props.images[activeImageIdx]}
          className='h-60 object-contain'
          alt=''
        />
      </div>

      <div className='flex items-center justify-center gap-2'>
        <button
          className='text-turkishRose p-2.5 rounded-[50%] shadow-md shadow-firebrick/30'
          onClick={onLeftClick}
        >
          <LeftOutlined rev='' className='text-xl' />
        </button>
        <div className='flex gap-2 overflow-x-auto scrollbar'>
          {props.images.map((image, index) => (
            <img
              src={image}
              ref={(el) =>
                (imgPreviewRefs.current[index] = el as HTMLImageElement)
              }
              onClick={() => onImagePreviewClick(index)}
              className='w-24 h-16 object-contain'
            />
          ))}
        </div>
        <button
          className='text-turkishRose p-2.5 rounded-[50%] shadow-md shadow-firebrick/30'
          onClick={onRightClick}
        >
          <RightOutlined rev='' className='text-xl' />
        </button>
      </div>
    </div>
  );
}
