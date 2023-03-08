import TopRatingCount from '@src/components/shared/TopRatingCount';
import { APP_PREFIX_PATH, PRICE_CURRENCY } from '@src/configs/AppConfig';
import ProductImage from '@src/assets/images/products/8.png';

import { DeleteOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

const CartSummary = ({ totalItems, totalPrice }: CartSummaryProps) => (
  <div
    className={`w-full lg:w-[30rem] bg-white h-64 rounded-2xl shadow-md px-5 flex flex-col justify-center gap-y-3`}
  >
    <h3 className='text-2xl font-bold text-OuterSpace'>Order Summary</h3>
    <div className='flex justify-between'>
      <div>
        <h4 className='text-OuterSpace font-semibold text-xl'>
          Sub Total{' '}
          <span className='text-Aluminium'> ({totalItems} item): </span>
        </h4>
        <p className='text-Aluminium font-semibold'> (Inclusive of VAT) </p>
      </div>
      <h4 className='text-OuterSpace font-semibold text-2xl'>
        {PRICE_CURRENCY} {totalPrice}
      </h4>
    </div>
    <Divider dashed={true} className='!m-0 !my-2 !border-[1px]' />
    <Link
      to={`${APP_PREFIX_PATH}/checkout`}
      className='w-full h-14 bg-turkishRose flex justify-center items-center rounded-sm text-white font-semibold'
    >
      Checkout
    </Link>
  </div>
);

interface CartItemProps {
  product: {
    id: string;
    image: string;
    manufacturer: string;
    name: string;
    rating: number;
    reviews: number;
    price: number;
    deliveryDate: string;
  };
  onQuantityChange: (quantity: number, productId: string) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ product, onQuantityChange, onRemove }: CartItemProps) => {
  return (
    <div
      className={`w-full bg-white h-96 rounded-2xl shadow-md px-11 pt-9 pb-3 flex gap-x-10`}
    >
      <img
        src={product.image}
        alt='Product'
        loading='lazy'
        className='w-44 h-52 object-scale-down'
      />
      <div className='flex flex-col gap-y-5 w-full'>
        <div className='flex flex-col gap-y-1'>
          <h3 className='text-2xl font-semibold text-[#9CA4AB]'>
            {product.manufacturer}
          </h3>
          <h1 className='font-semibold text-3xl text-firebrick'>
            {product.name}
          </h1>
          <TopRatingCount
            className='!text-sm'
            rate={product.rating}
            reviews={product.reviews}
          />
        </div>
        <h4 className='text-[#9CA4AB] font-bold text-2xl'>
          Sold by <strong> {product.manufacturer} </strong>
        </h4>
        <div className='flex flex-col gap-y-1'>
          <h2 className='font-semibold text-2xl text-firebrick'>
            {PRICE_CURRENCY} {product.price}
          </h2>
          <p className='text-Aluminium text-lg font-medium'>
            Expected Delivery by {product.deliveryDate}
          </p>
          <Divider dashed={true} className='!m-0 !my-2 !border-[1px]' />
          <div className='flex gap-x-5'>
            <select
              name='item-quantity'
              title='item-quantity'
              className='bg-sauvignon px-4 py-3 rounded-sm'
              onChange={(e) => onQuantityChange(+e.target.value, product.id)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <Divider type='vertical' className='!h-full !m-0' />
            <button
              onClick={() => onRemove(product.id)}
              className='text-Aluminium font-medium text-xl flex items-center gap-x-2'
            >
              <DeleteOutlined />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CartItemsListProps {
  items: CartItemProps[];
}

const CartItemsList = ({ items }: CartItemsListProps) => (
  <div className='grid grid-cols-1 gap-y-6 w-full lg:w-9/12 lg:max-w-4xl'>
    <CartItem
      product={{
        id: '1',
        image: ProductImage,
        manufacturer: 'Ikea',
        name: 'Luna Chair M2',
        price: 299,
        rating: 4.4,
        reviews: 533,
        deliveryDate: 'Thu, Jan 12'
      }}
      onQuantityChange={() => {}}
      onRemove={() => {}}
    />
    <CartItem
      product={{
        id: '1',
        image: ProductImage,
        manufacturer: 'Ikea',
        name: 'Luna Chair M2',
        price: 299,
        rating: 4.4,
        reviews: 533,
        deliveryDate: 'Thu, Jan 12'
      }}
      onQuantityChange={() => {}}
      onRemove={() => {}}
    />
  </div>
);

const CartListing = () => {
  // TODO: Fetch cart items from API
  return (
    <section className='w-full flex flex-col gap-y-8'>
      <h1 className='text-2xl font-bold text-OuterSpace'>Cart (2 items)</h1>
      <div className='flex flex-col lg:flex-row justify-between gap-8'>
        <CartItemsList items={[]} />
        <CartSummary totalItems={1} totalPrice={598} />
      </div>
    </section>
  );
};

export default CartListing;
