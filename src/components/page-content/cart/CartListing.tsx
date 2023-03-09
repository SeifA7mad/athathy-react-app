import TopRatingCount from '@src/components/shared/TopRatingCount';
import { APP_PREFIX_PATH, PRICE_CURRENCY } from '@src/configs/AppConfig';

import { DeleteOutlined } from '@ant-design/icons';
import { Divider, Empty, message, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchCart } from '@src/services/CartService';
import { CartProductsType } from '@src/types/API/CartType';

import {
  removeItemFromCart,
  updateItemQuantity
} from '@src/services/CartService';

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
    quantity: number;
    availableQuantity: number;
  };
  onQuantityChange: (productId: string, quantity: number) => void;
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
        className='w-44 h-52 object-cover'
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
              defaultValue={product.quantity}
              className='bg-sauvignon px-4 py-3 rounded-sm'
              onChange={(e) => onQuantityChange(product.id, +e.target.value)}
            >
              {[...Array(product.availableQuantity || 10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
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
  items: CartProductsType['items'];
  refetchCart: () => void;
}

const CartItemsList = ({ items, refetchCart }: CartItemsListProps) => {
  const { mutateAsync: removeItemFromCartMutation } = useMutation({
    mutationFn: async (data: { productId: string }) =>
      removeItemFromCart(data.productId)
  });

  const { mutateAsync: updateItemCartMutation } = useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) =>
      updateItemQuantity(data.productId, {
        quantity: data.quantity
      })
  });

  const onQuantityChange = async (productId: string, quantity: number) => {
    try {
      await updateItemCartMutation({ productId, quantity });
    } catch (error: any) {
      message.error("Couldn't update quantity");
    }
  };

  const onRemove = async (productId: string) => {
    try {
      await removeItemFromCartMutation({ productId });
      refetchCart();
    } catch (error: any) {
      message.error("Couldn't remove item");
    }
  };

  if (!items.length)
    return <Empty description='No products in your Cart' className='m-auto' />;

  return (
    <div className='grid grid-cols-1 gap-y-6 w-full lg:w-9/12 lg:max-w-4xl'>
      {items.map((item) => (
        <CartItem
          key={item.product.id}
          product={{
            id: item.product.id,
            image: item.product.images[0],
            manufacturer: item.product.productTemplate.brand.name,
            name: item.product.name,
            price: item.product.price,
            rating: 4.4,
            reviews: 533,
            quantity: item.quantity,
            availableQuantity:
              item.product.productTemplate.allowedQuantityPerOrder,
            deliveryDate: 'Thu, Jan 12'
          }}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

interface CartListingProps {
  cartProducts: CartProductsType | null;
  isFetching: boolean;
  refetchCart: () => void;
}

const CartListing = ({
  cartProducts,
  isFetching,
  refetchCart
}: CartListingProps) => {
  return (
    <section className='w-full flex flex-col gap-y-8'>
      <h1 className='text-2xl font-bold text-OuterSpace'>
        Cart ({cartProducts?.items.length || 0} items)
      </h1>
      <div className='flex flex-col lg:flex-row justify-between gap-8'>
        {!isFetching && cartProducts?.items ? (
          <CartItemsList
            items={cartProducts?.items || []}
            refetchCart={refetchCart}
          />
        ) : (
          <Spin className='!mx-auto' />
        )}
        <CartSummary
          totalItems={cartProducts?.items.length || 0}
          totalPrice={cartProducts?.priceTotal || 0}
        />
      </div>
    </section>
  );
};

export default CartListing;
