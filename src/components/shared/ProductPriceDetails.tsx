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
      <div className='flex gap-3 items-center w-full'>
        <span className='text-2xl font-semibold text-OuterSpace'>
          AED {props.price}
        </span>
        {props.oldPrice && (
          <>
            <span className='font-semibold line-through text-[#D72121]'>
              AED {props.oldPrice}
            </span>
            <span className='line-through text-OuterSpace'>
              {offPercentage}% off
            </span>
          </>
        )}
      </div>
      <span className='text-xs font-medium text-whiteSmoke'>
        &#40;Inclusive of Vat&#41;
      </span>
    </div>
  );
}
