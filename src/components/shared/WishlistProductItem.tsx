import WishlistIcon from '@src/assets/svg/WishlistIcon';
import TopRatingCount from './TopRatingCount';
import { PRICE_CURRENCY } from '@src/configs/AppConfig';
import { WishlistProductsType } from '@src/types/API/WishlistType';

export interface WishlistProductItemProps {
  product: WishlistProductsType['items'][0];
  onAddToCart: (productId: string) => void;
  onRemoveItemWishlist: (productId: string) => void;
  onNavigateToProduct: (productId: string, templateId: string) => void;
}

const WishlistProductItem = ({
  product,
  onAddToCart,
  onRemoveItemWishlist,
  onNavigateToProduct
}: WishlistProductItemProps) => (
  <div
    className={`w-96 h-48 px-4 lg:m-auto bg-white rounded-3xl shadow-md relative flex items-center justify-center gap-x-12`}
  >
    <img
      src={product.productTemplate.images[0]}
      alt='product'
      loading='lazy'
      className='w-28 h-32 object-contain drop-shadow-md'
    />
    <div className='flex flex-col gap-y-2 overflow-hidden'>
      <div>
        <h3 className='text-sm font-bold text-turkishRose'>
          {product.vendorName}
        </h3>
        <h1
          onClick={() =>
            onNavigateToProduct(product.id, product.productTemplate.id)
          }
          className='text-lg font-bold text-OuterSpace cursor-pointer truncate'
        >
          {product.name}
        </h1>
        <TopRatingCount />
      </div>
      <h4 className='font-bold text-lg text-OuterSpace flex gap-x-[0.625rem] items-center'>
        {PRICE_CURRENCY} {product.price}
        {product.mrpPrice && (
          <span className='font-semibold text-xs text-[#F41F52] line-through'>
            {PRICE_CURRENCY} {product.mrpPrice}
          </span>
        )}
      </h4>
      <button
        onClick={() => onAddToCart(product.id)}
        type='button'
        className='w-32 h-6 bg-turkishRose rounded-xl text-white text-xs font-medium flex justify-center items-center'
      >
        Add to cart
      </button>
    </div>
    <button
      type='button'
      title='add-to-wishlist'
      className='absolute right-5 top-5'
      onClick={() => onRemoveItemWishlist(product.id)}
    >
      <WishlistIcon className='w-4 h-4' />
    </button>
  </div>
);

export default WishlistProductItem;
