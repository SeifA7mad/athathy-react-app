import { RightOutlined } from '@ant-design/icons';
import ArrowLink from '@src/components/UI/ArrowLink';
import { Link } from 'react-router-dom';
import DemoChair from '@src/assets/images/new-arrivals-demo/chair.png';
import DemoTable from '@src/assets/images/new-arrivals-demo/table.png';
import { ListingItemsType } from '@src/types/API/WidgetType';
import NewArrivalItem from './new-arrival-item';

const DescriptionComponent = () => (
  <div className='w-full lg:w-48 flex flex-col gap-y-2 text-center lg:text-left bg-white rounded-3xl h-full px-6 py-2'>
    <h3 className='font-bold text-4xl text-OuterSpace'>
      New <span className='text-turkishRose'>Arrivals</span>
    </h3>
    <p className='font-medium text-lg text-whiteSmoke w-4/5'>
      Lorem ipsum dolor sit amet.
    </p>
    <button
      type='button'
      className={`w-10 h-10 rounded-full flex place-items-center justify-center text-white bg-OuterSpace text-lg self-center`}
    >
      <RightOutlined />
    </button>
  </div>
);

// interface ProductComponentProps {
//   title: string;
//   image: string;
//   link: string;
// }

// const ProductComponent1 = ({ title, image, link }: ProductComponentProps) => (
//   <div className='bg-white rounded-3xl w-96 h-96 relative pt-8 pl-6'>
//     <Link to={link} className='font-bold text-OuterSpace text-2xl'>
//       {title}
//       <ArrowLink className='w-36' />
//     </Link>
//     <img
//       src={image}
//       alt='Product'
//       loading='lazy'
//       className='w-96 h-80 object-scale-down'
//     />
//   </div>
// );

// const ProductComponent2 = ({ title, image, link }: ProductComponentProps) => (
//   <div className='bg-white rounded-3xl w-full max-w-[43rem] h-96 relative pt-8 pl-12 flex justify-between overflow-hidden'>
//     <div className='flex flex-col gap-y-14'>
//       <Link to={link} className='font-bold text-OuterSpace text-2xl'>
//         {title}
//         <ArrowLink className='w-52' />
//       </Link>
//       <h1 className='w-52 font-bold text-4xl text-OuterSpace'>
//         High Quality Furnitures
//       </h1>
//     </div>
//     <img
//       src={image}
//       alt='Product'
//       loading='lazy'
//       className='w-full h-72 mt-auto object-scale-down'
//     />
//   </div>
// );

interface NewArrivalsProps {
  banners?: ListingItemsType['Banner'][];
}

const newArrivals = [
  {
    category: 'Chair',
    name: 'Wooden Stools',
    price: 49,
    previousPrice: 84,
    image: DemoChair
  },
  {
    category: 'Chair',
    name: 'Wooden Stools',
    price: 49,
    previousPrice: 84,
    image: DemoChair
  },
  {
    category: 'Table',
    name: "High Quality Furniture's Wooden Table",
    price: 120,
    previousPrice: 240,
    image: DemoTable
  }
];

const NewArrivals = (props: NewArrivalsProps) => {
  return (
    <section className={`gap-x-5 max-w-[90rem] h-60 flex flex-col lg:flex-row`}>
      <DescriptionComponent />
      <div className='flex gap-x-5 m-auto h-full justify-items-stretch'>
        {newArrivals.map((item, index) => (
          <NewArrivalItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
