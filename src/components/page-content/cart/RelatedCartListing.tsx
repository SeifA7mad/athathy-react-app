import { useState, useRef } from 'react';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import CarouselNextButton from '@src/components/UI/CarouselNextButton';
import TopRatingCount from '@src/components/shared/TopRatingCount';
import { PRICE_CURRENCY } from '@src/configs/AppConfig';
import WishlistIcon from '@src/assets/svg/WishlistIcon';
import ProductImage from '@src/assets/images/products/8.png';

interface ProductItemProps {
  product: {
    id: string;
    image: string;
    manufacturer: string;
    name: string;
    rating: number;
    reviews: number;
    price: number;
    oldPrice?: number;
  };
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
}

const ProductItem = ({
  product,
  onAddToCart,
  onAddToWishlist
}: ProductItemProps) => (
  <div
    className={`w-96 h-48 bg-white rounded-3xl shadow-md relative flex items-center justify-center gap-x-12`}
  >
    <img
      src={product.image}
      alt='product'
      loading='lazy'
      className='w-28 h-32 object-scale-down drop-shadow-md'
    />
    <div className='flex flex-col gap-y-2'>
      <div>
        <h3 className='text-sm font-bold text-turkishRose'>
          {product.manufacturer}
        </h3>
        <h1 className='text-lg font-bold text-OuterSpace'>{product.name}</h1>
        <TopRatingCount rate={product.rating} reviews={product.reviews} />
      </div>
      <h4 className='font-bold text-lg text-OuterSpace flex gap-x-[0.625rem]'>
        {PRICE_CURRENCY} {product.price}
        {product.oldPrice && (
          <span className='font-semibold text-xs text-[#F41F52] line-through'>
            {PRICE_CURRENCY} {product.oldPrice}
          </span>
        )}
      </h4>
      <button
        onClick={() => onAddToCart(product.id)}
        className='w-full h-6 bg-turkishRose rounded-xl text-white text-xs font-medium flex justify-center items-center'
      >
        Add to cart
      </button>
    </div>
    <button
      type='button'
      title='add-to-wishlist'
      className='absolute right-5 top-5'
      onClick={() => onAddToWishlist(product.id)}
    >
      <WishlistIcon className='w-4 h-4' />
    </button>
  </div>
);

interface ProductItemsProps {
  products: ProductItemProps['product'][];
  onAddToCart: ProductItemProps['onAddToCart'];
  onAddToWishlist: ProductItemProps['onAddToWishlist'];
}

const ProductItems = ({
  products,
  onAddToCart,
  onAddToWishlist
}: ProductItemsProps) => {
  const carouselRef = useRef<CarouselRef>(null);

  const onNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  let responsive = [
    {
      breakpoint: 1426,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 596,
      settings: {
        slidesToShow: 1
      }
    }
  ];

  return (
    <div className='w-full max-w-7xl relative'>
      <Carousel
        ref={carouselRef}
        dots={false}
        prefixCls='w-full h-full relative'
        className='w-full h-full'
        autoplay={true}
        autoplaySpeed={5000}
        slidesToShow={3}
        responsive={responsive}
      >
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        ))}
      </Carousel>
      <CarouselNextButton
        onClick={onNext}
        className={`absolute top-1/2 -right-2 text-xs`}
      />
    </div>
  );
};

const OrdersItems = () => {
  // TODO: Fetch Orders items from API
};
const WishlistItems = ({
  products,
  onAddToCart,
  onAddToWishlist
}: ProductItemsProps) => {
  // TODO: Fetch wishlist items from API
  return (
    <ProductItems
      products={products}
      onAddToCart={onAddToCart}
      onAddToWishlist={onAddToWishlist}
    />
  );
};

const activeButtonStyle =
  '!text-OuterSpace !font-bold border-b-2 border-turkishRose';

const RelatedCartListing = () => {
  const [listingType, setListingType] = useState<'wishlist' | 'orders'>(
    'wishlist'
  );

  const onAddToCart = (productId: string) => {};
  const onAddToWishlist = (productId: string) => {};

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
      {listingType === 'wishlist' && (
        <WishlistItems
          products={[...Array(5)].map((_, index) => ({
            id: '1',
            manufacturer: 'Apple',
            name: 'iPhone 12 Pro Max',
            price: 999,
            oldPrice: 1099,
            rating: 4.5,
            reviews: 100,
            image: ProductImage
          }))}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      )}
    </div>
  );
};

export default RelatedCartListing;
