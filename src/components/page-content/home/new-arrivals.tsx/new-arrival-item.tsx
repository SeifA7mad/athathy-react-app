import ArrowLink from '@src/components/UI/ArrowLink';

type Props = {
  item: {
    category: string;
    name: string;
    price: number;
    previousPrice: number;
    image: string;
  };
};

export default function NewArrivalItem(props: Props) {
  return (
    <div className='bg-white flex flex-col px-6 pt-2 justify-between rounded-3xl gap-2 h-full flex-1'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-turkishRose font-bold text-2xl'>
          {props.item.category}
        </h2>
        <ArrowLink className='w-24 bg-turkishRose' />
      </div>

      <div className='flex items-center justify-center gap-2'>
        <div className='flex flex-col gap-1 py-2'>
          <span className='flex flex-col leading-5'>
            {props.item.name.split(' ').map((word) => (
              <span className='odd:font-bold'>{word}</span>
            ))}
          </span>
          <div className='relative font-bold'>
            <span className='text-lg'>AED.</span>
            <span className='absolute text-3xl text-green-500 left-14'>
              {props.item.price}
            </span>
          </div>
          <div className='flex flex-col text-xs'>
            <span className='text-[0.6rem]'>Previous price:</span>
            <span className='text-xs font-bold line-through'>
              AED {props.item.previousPrice}
            </span>
          </div>
        </div>
        <img src={props.item.image} alt='' className='w-48 object-contain' />
      </div>
    </div>
  );
}
