import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProduct } from '@src/services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { Collapse, Modal } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import Carousel from '../shared/Carousel';
import { calculateOffPercentage } from '@src/utils/CalculateOffPercentage';
import AthathyInputNumber from '../shared/AthathyInputNumber';
import HeartSvg from '@src/assets/svg/HeartSvg';
import { Interweave } from 'interweave';
import useProductActions from '@src/hooks/useProductActions';
import ProductReviewsSummary from '../shared/ProductReviewsSummary';
import ProductPriceDetails from '../shared/ProductPriceDetails';

interface ProductModalProps {
  onClose?: () => void;
}

interface ConfirmationModalResponse {
  ModalComponent: (args: ProductModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
}

const ProductQuickViewModal = (id: string): ConfirmationModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ModalComponent = (props: ProductModalProps) => {
    const [quantity, setQuantity] = useState(1);

    const { data: product } = useQuery({
      queryKey: [QueriesKeysEnum.PRODUCTS, id],
      queryFn: async () => fetchProduct(id),
      initialData: null,
      enabled: !!id && isModalVisible
    });

    const { onAddToCart, onAddToWishlist, isAddedToCart, isAddedToWishlist } =
      useProductActions({ productId: id, enabled: !!id && isModalVisible });

    return (
      <Modal
        className='!w-[52rem] !rounded-[1.25rem] !overflow-hidden'
        centered={true}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {!!product && (
          <div className='flex gap-6'>
            <div className='flex flex-col w-1/2'>
              <h2 className='text-whiteSmoke font-semibold text-lg'>
                {product.brand?.name}
              </h2>
              <h2 className='font-bold text-2xl text-OuterSpace'>
                {product.name}
              </h2>
              <ProductReviewsSummary
                overallRating={product.review?.overallRating ?? 0}
                reviewsCount={product.review?.total ?? 0}
              />
              {/* Carousel */}
              <Carousel
                images={product.images}
                mainImgClassName='w-[23.6875rem] h-[20.4375rem] object-cover'
                previewImgClassName='w-[3.875rem] h-[4.3125rem] object-cover'
              />
            </div>
            <div className='flex flex-col py-4 w-1/2 gap-6 justify-between'>
              {/* Product Price */}
              <div className='flex flex-col gap-2'>
                <ProductPriceDetails
                  price={product.price}
                  oldPrice={product.mrpPrice}
                />
                {/* Accordion */}
                <Collapse className='w-full' prefixCls='ant-collapse-product'>
                  <Collapse.Panel key={'description'} header='Description'>
                    <Interweave content={product.description} />
                  </Collapse.Panel>
                  <Collapse.Panel key={'Specification'} header='Specification'>
                    <Interweave content={product.description} />
                  </Collapse.Panel>
                </Collapse>
              </div>

              {/* Actions */}
              <div className='flex flex-col gap-[2.5rem]'>
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-3 items-center justify-center'>
                    <AthathyInputNumber
                      value={quantity}
                      setValue={setQuantity}
                      name='quantity'
                      max={product.allowedQuantityPerOrder}
                    />
                    <button
                      className={`${
                        isAddedToCart ? 'bg-red-900' : 'bg-turkishRose'
                      }  h-10 text-white w-full rounded-[75px] text-base font-medium`}
                      onClick={() => onAddToCart(product.id, quantity)}
                    >
                      {isAddedToCart ? 'Remove from Cart' : 'Add to cart'}
                    </button>
                  </div>
                  <button
                    className={`flex items-center justify-center gap-4 h-10 border-2 border-black rounded-[75px]`}
                    onClick={() => onAddToWishlist(product.id)}
                  >
                    {!isAddedToWishlist && <HeartSvg />}
                    <span className='font-medium text-OuterSpace'>
                      {isAddedToWishlist
                        ? 'Remove from Wishlist'
                        : 'Add to Wishlist'}
                    </span>
                  </button>
                </div>

                <Link
                  to={`${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${product.productTemplateId}/${product.id}`}
                  className='text-OuterSpace font-semibold w-fit border-b border-OuterSpace'
                >
                  See full details
                </Link>
              </div>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show)
  };
};

export default ProductQuickViewModal;
