import { useState } from 'react';

interface ProductItemProps {
  image: string;
  manufacturer: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

const ProductItems = (props: ProductItemProps) => {
  return <div className='flex gap-x-11 relative w-96 h-48 rounded-3xl'></div>;
};

const OrdersItems = () => {
  // TODO: Fetch Orders items from API
};
const WishlistItems = () => {
  // TODO: Fetch wishlist items from API
};

const activeButtonStyle =
  '!text-OuterSpace !font-bold border-b-2 border-turkishRose';

const RelatedCartListing = () => {
  const [listingType, setListingType] = useState<'wishlist' | 'orders'>(
    'wishlist'
  );

  return (
    <div className='flex flex-col gap-y-7 w-11/12'>
      <div className='flex gap-x-6'>
        <button
          type='button'
          className={`text-2xl font-medium text-[#A0A8AE] ${
            listingType === 'wishlist' && activeButtonStyle
          }`}
          onClick={() => setListingType('wishlist')}
        >
          Your Wish list
        </button>
        <button
          type='button'
          className={`text-2xl font-medium text-[#A0A8AE] ${
            listingType === 'orders' && activeButtonStyle
          }`}
          onClick={() => setListingType('orders')}
        >
          Order again
        </button>
      </div>
    </div>
  );
};

export default RelatedCartListing;
