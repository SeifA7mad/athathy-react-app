import { PRICE_CURRENCY } from '@src/configs/AppConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchCart } from '@src/services/CartService';
import { CartProductsType } from '@src/types/API/CartType';
import { paymentMethodType } from '@src/types/API/OrderType';
import { useQuery } from '@tanstack/react-query';
import { Divider, Empty, Spin } from 'antd';
import { useMemo } from 'react';

const OrderList = ({ products }: { products?: CartProductsType['items'] }) => {
  if (!products || !products.length) {
    return <Empty description='No products in cart' />;
  }

  return (
    <ul
      className={`w-full flex flex-col scrollbar max-h-[22rem] overflow-y-auto ${
        products.length > 2 ? 'pr-2' : ''
      } gap-y-8`}
    >
      {products.map(({ product, quantity }) => (
        <li
          key={product.id}
          className='flex gap-x-7 h-[8.6875rem] items-center w-full bg-white rounded-xl p-[.9375rem]'
        >
          <img
            alt='product'
            loading='lazy'
            src={product.images[0]}
            className='w-[6.8125rem] h-[6.8125rem] object-cover'
          />
          <div className='flex flex-col gap-y-[.625rem] text-firebrick font-semibold overflow-hidden w-2/3'>
            <div className='flex flex-col gap-y-[.3125rem]'>
              <h3 className='text-base text-OuterSpace font-bold leading-[1.26rem]'>
                {product.name}
              </h3>
              <h4 className='text-sm font-bold leading-[1.125rem]'>
                {PRICE_CURRENCY} {product.price}
              </h4>
            </div>
            <p className='text-sm text-gray40 font-medium'>
              From{' '}
              {new Date(
                new Date().setDate(new Date().getDate() + 5)
              ).toDateString()}{' '}
              to{' '}
              {new Date(
                new Date().setDate(new Date().getDate() + 7)
              ).toDateString()}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

interface ReviewOrderProps {
  onCheckoutHandler: () => void;
  selectedPaymentMethod: paymentMethodType;
  isSubmitting: boolean;
  discount?: number;
}

const shippingFees: { [key in paymentMethodType]: number } = {
  Cod: 0,
  Online: 0
};

const ReviewOrder = ({
  onCheckoutHandler,
  selectedPaymentMethod,
  isSubmitting,
  discount = 0
}: ReviewOrderProps) => {
  const {
    data: cartProducts,
    isFetching,
    refetch
  } = useQuery({
    queryKey: [QueriesKeysEnum.CART],
    queryFn: async () => fetchCart(),
    initialData: null
  });

  const cartTotalPrice = useMemo(
    () =>
      cartProducts?.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    [cartProducts]
  );

  const orderTotalPrice =
    shippingFees[selectedPaymentMethod] + (cartTotalPrice || 0) - discount;

  const totalItems = cartProducts?.items.length || 0;

  return (
    <div className='flex flex-col gap-y-[4.5rem] w-full md:w-[23.0625rem]'>
      <div className='flex flex-col gap-y-[1.1875rem]'>
        <div className='flex flex-col gap-[.75rem] ml-[.875rem]'>
          <h1 className='font-bold text-2xl text-gray40'>Review your order </h1>
          <Divider className='!m-0 !w-[8.8125rem] !min-w-0 border-turkishRose border-[.1875rem] rounded-lg' />
        </div>
        {isFetching && <Spin />}
        {!isFetching && <OrderList products={cartProducts?.items} />}
      </div>

      <div
        className={`w-full h-[20.0275rem] bg-white py-[1.25rem] rounded-2xl px-[1.875rem] flex flex-col justify-center gap-y-[.9375rem]`}
      >
        <div className='flex flex-col gap-y-[.9375rem]'>
          <h3 className='text-lg font-bold text-OuterSpace leading-[1.875rem]'>
            Order Summary
          </h3>

          <div className='flex justify-between items-center'>
            <h4 className='text-OuterSpace text-base leading-[1.26rem]'>
              Sub Total{' '}
              <span className='text-Aluminium font-semibold'>
                ({totalItems} item{totalItems > 1 ? 's' : ''}):
              </span>
            </h4>
            <h4
              className={`text-OuterSpace font-semibold text-base leading-[1.125rem]`}
            >
              {PRICE_CURRENCY} {orderTotalPrice.toFixed(2)}
            </h4>
          </div>

          <div className='flex justify-between'>
            <h4 className='text-OuterSpace text-base leading-[1.125rem]'>
              Shipping Fee
            </h4>
            <h4
              className={`text-OuterSpace text-base leading-[1.125rem] ${
                shippingFees[selectedPaymentMethod] === 0
                  ? 'text-[#008000]'
                  : ''
              }`}
            >
              {shippingFees[selectedPaymentMethod] === 0
                ? 'Free'
                : `${PRICE_CURRENCY} ${shippingFees[selectedPaymentMethod]}`}
            </h4>
          </div>

          <div className='flex justify-between'>
            <h4 className='text-OuterSpace text-base leading-[1.125rem]'>
              Discount
            </h4>
            <h4 className={`text-OuterSpace text-base leading-[1.125rem]`}>
              {discount > 0 ? `-${PRICE_CURRENCY} ${discount}` : '-'}
            </h4>
          </div>

          <Divider dashed={true} className='!m-0 !border-[1px]' />
        </div>

        <div className='flex flex-col gap-[1.875rem]'>
          <div className='flex justify-between items-center'>
            <h3 className='text-base font-bold text-OuterSpace leading-[1.875rem]'>
              Total{' '}
              <span className='font-semibold text-Aluminium text-sm'>
                &#40;Inclusive of Vat&#41;
              </span>
            </h3>
            <h3 className='text-base font-bold text-OuterSpace leading-[1.125rem]'>
              {PRICE_CURRENCY}{' '}
              {(
                cartTotalPrice! +
                shippingFees[selectedPaymentMethod] -
                discount
              ).toFixed(2)}
            </h3>
          </div>

          <button
            type='button'
            disabled={isSubmitting}
            onClick={onCheckoutHandler}
            className='text-white font-semibold bg-turkishRose w-full h-14 flex items-center rounded-xl justify-center hover:opacity-75'
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
