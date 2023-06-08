import { calculateOffPercentage } from '@src/utils/CalculateOffPercentage';
import React from 'react';

interface Props {
  price: number;
  oldPrice?: number;
}

export default function ProductPriceDetails(props: Props) {
  const offPercentage = props.oldPrice
    ? calculateOffPercentage(props.oldPrice, props.price)
    : 0;

  return (
    <div className='flex flex-col'>
      <div className='flex gap-[.75rem] w-full'>
        <span className='text-[1.625rem] font-semibold text-OuterSpace leading-[1.75rem]'>
          AED {props.price.toFixed(2)}
        </span>
        {props.oldPrice && (
          <div className='flex self-end gap-[.75rem]'>
            <span className='font-medium text-base line-through text-[#D72121] leading-[1.125rem]'>
              AED {props.oldPrice.toFixed(2)}
            </span>
            <span className='font-medium text-base text-OuterSpace leading-[1.125rem]'>
              {offPercentage}% off
            </span>
          </div>
        )}
      </div>
      <span className='text-xs font-medium text-whiteSmoke'>
        &#40;Inclusive of Vat&#41;
      </span>
      {props.oldPrice && (
        <span className='text-xl font-medium text-[#30B700]'>On sale</span>
      )}
    </div>
  );
}
