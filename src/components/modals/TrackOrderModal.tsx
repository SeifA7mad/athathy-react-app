import { OrderItemType } from '@src/types/API/OrdersType';
import { Divider, Modal, Popover, Steps, StepsProps } from 'antd';
import { useState } from 'react';
import ReturnOrderForm from '../forms/ReturnOrderForm';

interface TrackOrderModalProps {
  onClose?: () => void;
}

interface TrackOrderModalResponse {
  ModalComponent: (args: TrackOrderModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
  setOrderItem: (orderItem: OrderItemType) => void;
}

const customDot: StepsProps['progressDot'] = (
  dot,
  { status, title, index }
) => (
  <Popover
    content={
      <span>
        step {index + 1} status: {title}
      </span>
    }
  >
    {dot}
  </Popover>
);

const TrackingStatus = {
  Pending: 0,
  Confirmed: 0,
  Shipped: 1,
  'Out for Delivery': 2,
  Delivered: 3
} as Record<OrderItemType['status'], number>;

const TrackOrderModal = (): TrackOrderModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [orderItem, setOrderItem] = useState<OrderItemType | null>(null);

  const ModalComponent = ({ onClose }: TrackOrderModalProps) => (
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
        <h1 className='font-bold text-OuterSpace text-2xl'>
          Tracking Your Order
        </h1>
        <p className='text-lg font-semibold text-turkishRose bg-sauvignon px-2'>
          {orderItem?.orderNo}
        </p>
        <Divider className='!m-auto !border-[1px] border-sauvignon !min-w-0 !w-4/5' />
        <Steps
          current={TrackingStatus[orderItem?.status || 'Pending']}
          progressDot={customDot}
          items={[
            {
              title: 'Pending/Confirmed',
              description: 'You can hover on the dot.'
            },
            {
              title: 'Shipped',
              description: 'You can hover on the dot.'
            },
            {
              title: 'out for Delivery',
              description: 'You can hover on the dot.'
            },
            {
              title: 'Delivered',
              description: 'You can hover on the dot.'
            }
          ]}
        />
      </div>
    </Modal>
  );

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show),
    setOrderItem
  };
};

export default TrackOrderModal;
