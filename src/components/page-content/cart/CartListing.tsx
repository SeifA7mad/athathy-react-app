import TopRatingCount from '@src/components/shared/TopRatingCount';
import { APP_PREFIX_PATH, PRICE_CURRENCY } from '@src/configs/AppConfig';

import { DeleteOutlined } from '@ant-design/icons';
import { Divider, Empty, message, notification, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CartProductsType } from '@src/types/API/CartType';

import {
  removeItemFromCart,
  updateItemQuantity
} from '@src/services/CartService';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { useEffect, useMemo, useRef, useState } from 'react';
import { applyCoupon } from '@src/services/OrdersService';
import AthathyInputNumber from '@src/components/shared/AthathyInputNumber';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  shippingFee: number;
}

const CartSummary = ({
  totalItems,
  totalPrice,
  shippingFee
}: CartSummaryProps) => {
  const CouponRef = useRef<HTMLInputElement>(null);

  const [discount, setDiscount] = useState(0);

  const onCouponSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const coupon = CouponRef.current?.value;

    if (!coupon) return;

    try {
      const result = await applyCoupon(coupon);

      setDiscount(result.discount);
      notification.success({
        message: 'Coupon Applied'
      });
    } catch (error: any) {
      notification.error({
        message: 'Coupon not applied',
        description: error.message
      });
    }
  };

  return (
    <section className={`w-full lg:w-[30rem] flex flex-col gap-y-7`}>
      <form className='w-full relative' onSubmit={onCouponSubmit}>
        <input
          ref={CouponRef}
          type='text'
          placeholder='Coupon Code'
          className='w-full bg-white rounded-2xl py-5 px-7'
        />
        <button
          className='absolute right-0 top-0 bg-turkishRose h-full w-24 rounded-r-2xl flex justify-center items-center text-white font-semibold'
          type='submit'
        >
          Add
        </button>
      </form>
      <div
        className={`w-full bg-white py-6 rounded-2xl shadow-md px-5 flex flex-col justify-center gap-y-3`}
      >
        <div className='flex flex-col gap-4'>
          <h3 className='text-lg font-bold text-OuterSpace'>Order Summary</h3>

          <div className='flex justify-between'>
            <h4 className='text-OuterSpace text-base'>
              Sub Total{' '}
              <span className='text-Aluminium font-semibold'>
                ({totalItems} item{totalItems > 1 ? 's' : ''}):
              </span>
            </h4>
            <h4
              className={`text-OuterSpace font-semibold text-base ${
                !!discount ? 'line-through text-red-600' : ''
              }`}
            >
              {PRICE_CURRENCY} {totalPrice.toFixed(2)}
            </h4>
          </div>

          <div className='flex justify-between'>
            <h4 className='text-OuterSpace text-base'>Shipping Fee</h4>
            <h4
              className={`text-OuterSpace font-semibold text-base ${
                shippingFee === 0 ? 'text-[#008000]' : ''
              }`}
            >
              {shippingFee === 0 ? 'Free' : `${PRICE_CURRENCY} ${shippingFee}`}
            </h4>
          </div>

          <div className='flex justify-between'>
            <h4 className='text-OuterSpace text-base'>Discount</h4>
            <h4 className={`text-OuterSpace font-semibold text-base`}>
              {discount > 0 ? `-${PRICE_CURRENCY} ${discount}` : '-'}
            </h4>
          </div>
        </div>

        <Divider dashed={true} className='!m-0 !border-[1px]' />

        <div className='flex justify-between'>
          <h3 className='text-base font-bold text-OuterSpace'>
            Total{' '}
            <span className='font-semibold text-Aluminium text-sm'>
              &#40;Inclusive of Vat&#41;
            </span>
          </h3>
          <h3 className='text-base font-bold text-OuterSpace'>
            {PRICE_CURRENCY} {(totalPrice + shippingFee - discount).toFixed(2)}
          </h3>
        </div>

        <Divider dashed={true} className='!m-0 !border-[1px]' />

        {!!totalItems && (
          <Link
            to={`${APP_PREFIX_PATH}/${RouteKeysEnum.checkout}${
              CouponRef.current?.value
                ? `?coupon=${CouponRef.current?.value}&`
                : ''
            }`}
            className='w-full h-14 bg-turkishRose flex justify-center items-center rounded-xl text-white font-semibold'
          >
            Checkout
          </Link>
        )}
      </div>
    </section>
  );
};

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
    templateId: string;
    variant?: {
      attributes: [
        {
          value: {
            value: string;
          };
        }
      ];
    };
  };
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onNavigateToProduct: (productId: string, templateId: string) => void;
}

const CartItem = ({
  product,
  onQuantityChange,
  onRemove,
  onNavigateToProduct
}: CartItemProps) => {
  const cartItemColor = product.variant?.attributes[0].value.value;

  return (
    <div
      className={`w-full bg-white h-72 rounded-2xl shadow-md px-11 py-2 flex justify-between`}
    >
      <img
        src={product.image}
        alt='Product'
        loading='lazy'
        className='w-44 h-52 object-contain'
      />
      <div className='w-1/2 overflow-hidden'>
        <div className='flex flex-col gap-y-1'>
          <h3 className='text-2xl font-semibold text-[#9CA4AB]'>
            {product.manufacturer}
          </h3>
          <h1
            className='font-semibold text-3xl text-firebrick cursor-pointer truncate'
            onClick={() => onNavigateToProduct(product.id, product.templateId)}
          >
            {product.name}
          </h1>
          <TopRatingCount
            className='!text-sm'
            rate={product.rating}
            reviews={product.reviews}
          />

          {cartItemColor && (
            <p className='font-medium text-lg text-Aluminium'>
              Color: {cartItemColor}
            </p>
          )}

          <Divider
            dashed={true}
            className='!m-0 !my-2 !border-[1px] bg-[#ECEAE9]'
          />
          <div className='flex items-center gap-x-5'>
            <AthathyInputNumber
              name='quantity'
              setValue={(value) => onQuantityChange(product.id, value)}
              className='rounded-lg p-1 justify-between'
              inputClassName='w-[4rem]'
              buttonClassName='rounded-xl'
              min={1}
              step={1}
              value={product.quantity}
              max={product.availableQuantity ?? 10}
            />
            <Divider type='vertical' className='!h-7 !m-0 bg-[#ECEAE9]' />
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
      <h2 className='font-semibold text-2xl text-firebrick mt-4'>
        {PRICE_CURRENCY} {product.price.toFixed(2)}
      </h2>
    </div>
  );
};

interface CartItemsListProps {
  items: CartProductsType['items'];
  refetchCart: () => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
}

const CartItemsList = ({
  items,
  refetchCart,
  updateCartItemQuantity
}: CartItemsListProps) => {
  const navigate = useNavigate();

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
      updateCartItemQuantity(productId, quantity);
    } catch (error: any) {
      notification.error({
        message: "Couldn't update item quantity"
      });
    }
  };

  const onNavigateToProduct = (productId: string, templateId: string) => {
    navigate(
      `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${templateId}/${productId}`
    );
  };

  const onRemove = async (productId: string) => {
    try {
      await removeItemFromCartMutation({ productId });
      refetchCart();
    } catch (error: any) {
      notification.error({
        message: "Couldn't remove item from cart"
      });
    }
  };

  if (!items.length)
    return <Empty description='No products in your Cart' className='m-auto' />;

  const deliveryDate = new Date(
    new Date().setDate(new Date().getDate() + 7)
  ).toDateString();

  return (
    <div
      className={`grid grid-cols-1 gap-y-6 w-full max-h-[35rem] overflow-y-auto scrollbar ${
        items.length > 1 ? 'pr-4' : ''
      } lg:w-9/12 lg:max-w-[50rem]`}
    >
      {items.map((item) => (
        <CartItem
          key={item.product.id}
          product={{
            id: item.product.id,
            image: item.product.productTemplate.images[0],
            manufacturer: item.product.productTemplate.brand.name,
            name: item.product.name,
            price: item.product.price,
            rating: item.product.rating,
            reviews: item.product.reviews,
            quantity: item.quantity,
            availableQuantity:
              item.product.productTemplate.allowedQuantityPerOrder,
            deliveryDate: deliveryDate,
            templateId: item.product.productTemplate.id
          }}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
          onNavigateToProduct={onNavigateToProduct}
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
  const [cartItems, setCartItems] = useState<CartProductsType['items']>([]);

  const cartTotalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    if (cartProducts?.items) setCartItems(cartProducts.items);
  }, [cartProducts]);

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) => {
      const itemIndex = prev.findIndex((item) => item.product.id === productId);
      if (itemIndex === -1) return prev;
      const newItems = [...prev];
      newItems[itemIndex].quantity = quantity;
      return newItems;
    });
  };
  return (
    <section className='w-full flex flex-col gap-y-8'>
      <h1 className='text-2xl font-bold text-OuterSpace'>
        Cart ({cartProducts?.items.length || 0} items)
      </h1>
      <div className='flex w-11/12 flex-col lg:flex-row justify-between gap-8'>
        {!isFetching && cartProducts?.items ? (
          <CartItemsList
            items={cartProducts?.items || []}
            updateCartItemQuantity={updateCartItemQuantity}
            refetchCart={refetchCart}
          />
        ) : (
          <Spin className='!mx-auto' />
        )}
        <CartSummary
          shippingFee={0}
          totalItems={cartProducts?.items.length || 0}
          totalPrice={cartTotalPrice || 0}
        />
      </div>
    </section>
  );
};

export default CartListing;
