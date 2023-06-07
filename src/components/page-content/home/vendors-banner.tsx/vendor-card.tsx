import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  id: string;
  image: string;
  imgClassName?: string;
}

export default function VendorCard(props: Props) {
  return (
    <Link
      to={`${APP_PREFIX_PATH}/vendors/${props.id}`}
      className='w-[9.375rem]'
    >
      <div className='flex flex-col w-full gap-y-[.625rem] rounded-[1.5rem] overflow-hidden hover:text-turkishRose'>
        <img
          src={props.image}
          alt='vendor'
          className={`w-full aspect-square object-cover rounded-3xl bg-white ${props.imgClassName}`}
        />
        <h4 className='font-bold text-OuterSpace text-base text-center px-2'>
          {props.name.toUpperCase()}
        </h4>
      </div>
    </Link>
  );
}
