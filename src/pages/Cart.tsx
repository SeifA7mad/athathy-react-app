import CartListing from '@src/components/page-content/cart/CartListing';
import RelatedCartListing from '@src/components/page-content/cart/RelatedCartListing';

const Cart = () => {
  return (
    <div className='w-11/12 mx-auto py-16 flex flex-col gap-y-16'>
      <CartListing />
      <RelatedCartListing />
    </div>
  );
};

export default Cart;
