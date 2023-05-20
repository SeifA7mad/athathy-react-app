import { CategoryType } from '@src/types/API/ProductType';
import { Spin } from 'antd';

interface Props {
  subcategories?: CategoryType[];
  isFetching: boolean;
}

export default function Subcategories(props: Props) {
  if (props.isFetching) {
    return <Spin className='!min-h-[18rem]' />;
  }

  return (
    <div className='w-full flex flex-wrap items-center gap-2'>
      {props.subcategories?.map((subcategory) => (
        <div
          key={subcategory.id}
          className='flex items-center justify-center text-center text-OuterSpace gap-2 w-48 h-14 rounded-md bg-white'
        >
          <span>{subcategory.name}</span>
        </div>
      ))}
    </div>
  );
}
