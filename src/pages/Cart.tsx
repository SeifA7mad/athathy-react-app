import CartListing from '@src/components/page-content/cart/CartListing';
import RelatedCartListing from '@src/components/page-content/cart/RelatedCartListing';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchCart } from '@src/services/CartService';
import { useQuery } from '@tanstack/react-query';

const Cart = () => {
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
    <div className='w-11/12 mx-auto py-16 flex flex-col gap-y-16'>
      <CartListing
        cartProducts={cartProducts}
        isFetching={isFetching}
        refetchCart={refetch}
      />
      <RelatedCartListing refetchCart={refetch} />
    </div>
  );
};

export default Cart;
