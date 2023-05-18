import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProduct } from '@src/services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { Collapse, Modal } from 'antd';
import { useState } from 'react';
import OverallRating from '../shared/OverallRating';
import { Link } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import Carousel from '../shared/Carousel';

interface ProductModalProps {
  onClose?: () => void;
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

  const ModalComponent = (props: ProductModalProps) => (
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
                <span className='font-semibold line-through text-[#D72121]'>
                  AED {1000}
                </span>
                <span className='line-through text-OuterSpace'>%60 off</span>
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
            <div className='flex flex-col'>
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

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show)
  };
};

export default ProductQuickViewModal;
