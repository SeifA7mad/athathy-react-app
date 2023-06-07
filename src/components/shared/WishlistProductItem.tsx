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
    className={`w-[21.1375rem] h-[10rem] p-[.9375rem] lg:m-auto bg-white rounded-3xl relative flex gap-x-[.625rem]`}
  >
    <img
      src={product.productTemplate.images[0]}
      alt='product'
      loading='lazy'
      className='w-[130px] h-[8.125rem] object-cover drop-shadow-md'
    />
    <div className='flex flex-col justify-between overflow-hidden gap-[.1875rem]'>
      <div className='flex flex-col gap-[.1875rem]'>
        <h3 className='text-[.625rem] font-semibold text-turkishRose leading-[.7813rem]'>
          {product.vendorName}
        </h3>
        <h1
          onClick={() =>
            onNavigateToProduct(product.id, product.productTemplate.id)
          }
          className='text-sm font-bold text-OuterSpace cursor-pointer leading-[1.1025rem]'
        >
          {product.name}
        </h1>
      </div>

      <div className='flex flex-col gap-[.7063rem]'>
        <div className='flex flex-col gap-[.25rem]'>
          <h4 className='font-bold text-sm text-OuterSpace flex gap-x-[.625rem] items-center'>
            {PRICE_CURRENCY} {product.price}
            {product.mrpPrice && (
              <span className='font-semibold text-xs text-[#F41F52] line-through'>
                {PRICE_CURRENCY} {product.mrpPrice}
              </span>
            )}
          </h4>
          <TopRatingCount />
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          type='button'
          className='w-[8rem] h-[1.5625rem] leading-[1.0875rem] bg-turkishRose rounded-xl text-white text-xs font-medium flex justify-center items-center'
        >
          Add to cart
        </button>
      </div>
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
