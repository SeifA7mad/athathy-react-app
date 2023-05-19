import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProduct } from '@src/services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { Collapse, Input, InputNumber, Modal } from 'antd';
import { useState } from 'react';
import OverallRating from '../shared/OverallRating';
import { Link } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import Carousel from '../shared/Carousel';
import { calculateOffPercentage } from '@src/utils/CalculateOffPercentage';
import AthathyInputNumber from '../shared/AthathyInputNumber';
import { HeartOutlined } from '@ant-design/icons';
import HeartSvg from '@src/assets/svg/HeartSvg';

interface ProductModalProps {
  onClose?: () => void;
  oldPrice?: number;
}

interface ConfirmationModalResponse {
  ModalComponent: (args: ProductModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
}

const ProductQuickViewModal = (id: string): ConfirmationModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: product, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.PRODUCTS, id],
    queryFn: async () => fetchProduct(id),
    initialData: null,
    enabled: !!id && isModalVisible
  });

  const ModalComponent = (props: ProductModalProps) => {
    const offPercentage = props.oldPrice
      ? calculateOffPercentage(props.oldPrice, product?.price || 0)
      : 0;

    return (
      <Modal
        className='!w-[52rem]'
        centered={true}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {!!product && (
          <div className='flex gap-6'>
            <div className='flex flex-col w-1/2'>
              <h2 className='text-whiteSmoke'>{product.brand.name}</h2>
              <h2 className='font-bold text-2xl text-OuterSpace'>
                {product.name}
              </h2>
              <div className='flex items-center gap-2'>
                <OverallRating
                  overallRating={product.review?.overallRating || 0}
                  className='bg-transparent !p-0 !py-2'
                />
                <span className='text-yellow-500 font-semibold'>
                  {product.review?.overallRating || 0}
                </span>
                <span className='text-whiteSmoke font-semibold ml-3'>
                  &#40;{product.review?.total || 0} reviews&#41;
                </span>
              </div>
              {/* Carousel */}
              <Carousel
                images={[
                  ...product.images,
                  ...product.images,
                  ...product.images,
                  ...product.images,
                  ...product.images
                ]}
              />
            </div>
            <div className='flex flex-col py-4 w-1/2 gap-3 justify-between'>
              {/* Product Price */}
              <div className='flex flex-col gap-2'>
                <div className='flex gap-3 items-center w-full'>
                  <span className='text-2xl font-semibold text-OuterSpace'>
                    AED {product.price}
                  </span>
                  {props.oldPrice && (
                    <>
                      <span className='font-semibold line-through text-[#D72121]'>
                        AED {props.oldPrice}
                      </span>
                      <span className='line-through text-OuterSpace'>
                        {offPercentage}% off
                      </span>
                    </>
                  )}
                </div>
                <span className='text-xs font-medium text-whiteSmoke'>
                  &#40;Inclusive of Vat&#41;
                </span>
                <span className='text-xl font-medium text-[#30B700]'>
                  On sale
                </span>
                {/* Accordion */}
                <Collapse className='w-full' prefixCls='ant-collapse-product'>
                  <Collapse.Panel key={'description'} header='Description'>
                    {product.description}
                  </Collapse.Panel>
                  <Collapse.Panel key={'Specification'} header='Specification'>
                    {product.description}
                  </Collapse.Panel>
                </Collapse>
              </div>

              {/* Actions */}
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-3 items-center justify-center'>
                    <AthathyInputNumber name='quantity' />
                    <button className='bg-turkishRose h-10 text-white w-full rounded-[75px] font-medium'>
                      Add To Cart
                    </button>
                  </div>
                  <button className='flex items-center justify-center gap-4 h-10 border-2 border-black rounded-[75px]'>
                    <HeartSvg className='w-6' />
                    <span className='font-medium text-OuterSpace'>
                      Save to wishlist
                    </span>
                  </button>
                </div>

                <Link
                  to={`${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${product.productTemplateId}/${product.id}`}
                  className='decoration-solid text-OuterSpace font-semibold underline'
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
