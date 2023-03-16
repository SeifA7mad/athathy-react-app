import { PRICE_CURRENCY } from '@src/configs/AppConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchCart } from '@src/services/CartService';
import { CartProductsType } from '@src/types/API/CartType';
import { useQuery } from '@tanstack/react-query';
import { Divider, Empty, Spin } from 'antd';

const OrderList = ({ products }: { products?: CartProductsType['items'] }) => {
  if (!products || !products.length) {
    return <Empty description='No products in cart' />;
  }

  return (
    <ul className='w-full flex flex-col gap-y-8'>
      {products.map(({ product, quantity }) => (
        <li
          key={product.id}
          className='flex gap-x-7 items-center w-full bg-white rounded-xl p-5'
        >
          <div className='bg-[#F5F5F5] w-24 h-28 flex items-center justify-center'>
            <img
              alt='product'
              loading='lazy'
              src={product.images[0]}
              className='w-16 h-16 object-contain'
            />
          </div>
          <div className='flex flex-col gap-y-4 text-firebrick font-semibold'>
            <h3 className='text-xl'>{product.name}</h3>
            <h4 className='text-base'>
              {PRICE_CURRENCY} {product.price}
            </h4>
            <p className='text-sm text-gray40 font-medium'>{product.stock}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

interface ReviewOrderProps {
  onCheckoutHandler: () => void;
}

const ReviewOrder = ({ onCheckoutHandler }: ReviewOrderProps) => {
  const {
    data: cartProducts,
    isFetching,
    refetch
  } = useQuery({
    queryKey: [QueriesKeysEnum.CART],
    queryFn: async () => fetchCart(),
    initialData: null
  });

  return (
    <div className='flex flex-col gap-y-5 w-full md:w-80'>
      <h1 className='font-bold text-3xl text-gray40'>Review your order </h1>
      <Divider className='!m-0 !w-2/5 !min-w-0 border-turkishRose border-[1.5px]' />
      {isFetching && <Spin />}
      {!isFetching && <OrderList products={cartProducts?.items} />}
      <div className='w-full bg-white rounded-xl flex flex-col gap-y-9 p-7'>
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center justify-between text-sm font-normal text-gray40'>
            <p>Subtotal</p>
            <p>
              {PRICE_CURRENCY} {cartProducts?.mrpTotal || 0}
            </p>
          </div>
          <div className='flex items-center justify-between text-sm font-normal text-gray40'>
            <p>Shipping Fee</p>
            <p className='text-[#008000]'>Free</p>
          </div>
        </div>
        <Divider className='!m-0' />
        <div className='flex justify-between text-sm font-bold text-gray40'>
          <p>
            TOTAL <span className='font-normal'>(Inclusive of VAT)</span>
          </p>
          <p>
            {PRICE_CURRENCY} {cartProducts?.priceTotal || 0}
          </p>
        </div>
        <button
          type='button'
          onClick={onCheckoutHandler}
          className='text-white font-semibold bg-turkishRose w-full h-14 flex items-center justify-center hover:opacity-75'
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ReviewOrder;
