import { Link } from 'react-router-dom';

interface Props {
  name: string;
  id: string;
  image: string;
  imgClassName?: string;
}

export default function VendorCard(props: Props) {
  return (
    <div className='flex flex-col gap-y-5 m-auto lg:m-0 w-64'>
      <div className='w-full h-64 bg-white rounded-3xl flex'>
        <img
          src={props.image}
          alt='vendor'
          className={`w-full h-1/2 m-auto object-contain ${props.imgClassName}`}
        />
      </div>
      <div className='flex items-center justify-center'>
        <Link
          to={props.id}
          className='font-bold text-OuterSpace text-[1.625rem] text-center hover:text-turkishRose'
        >
          {props.name.toUpperCase()}
        </Link>
      </div>
    </div>
  );
}
