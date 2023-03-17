import { OrderItemType } from '@src/types/API/OrdersType';
import { Divider, Modal } from 'antd';
import { useState } from 'react';
import ReturnOrderForm from '../forms/ReturnOrderForm';

interface ReturnOrderModalProps {
  onClose?: () => void;
}

interface ReturnOrderModalResponse {
  ModalComponent: (args: ReturnOrderModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
  setOrderItem: (orderItem: OrderItemType) => void;
}

const ReturnOrderModal = (): ReturnOrderModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [orderItem, setOrderItem] = useState<OrderItemType | null>(null);

  const ModalComponent = ({ onClose }: ReturnOrderModalProps) => (
    <Modal
      className='!w-[58rem]'
      centered={true}
      open={isModalVisible}
      closeIcon={<> </>}
      onCancel={() => {
        setIsModalVisible(false);
        onClose && onClose();
      }}
      footer={null}
    >
      <div className={`flex flex-col justify-center items-center gap-y-5`}>
        <div className='flex flex-col gap-y-1'>
          <h1 className='font-bold text-OuterSpace text-2xl'>Return Order</h1>
          <p className='text-turkishRose font-semibold text-lg bg-sauvignon px-2 text-center rounded-2xl'>
            {' '}
            {orderItem?.orderNo}{' '}
          </p>
        </div>
        <Divider className='!m-auto !border-[1px] border-sauvignon !min-w-0 !w-4/5' />
        {orderItem && (
          <ReturnOrderForm
            onFinish={() => setIsModalVisible(false)}
            order={orderItem}
          />
        )}
      </div>
    </Modal>
  );

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show),
    setOrderItem
  };
};

export default ReturnOrderModal;
