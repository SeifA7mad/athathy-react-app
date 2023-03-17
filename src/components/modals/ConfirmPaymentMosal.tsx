import ConfirmSvg from '@src/assets/svg/CofirmSvg';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import {
  RouteDashboardKeysEnum,
  RouteKeysEnum
} from '@src/configs/RoutesConfig';
import { Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ConfirmPaymentModalProps {
  onClose?: () => void;
}

interface ConfirmPaymentModalResponse {
  ModalComponent: (args: ConfirmPaymentModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
}

const ConfirmPaymentModal = (): ConfirmPaymentModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const ModalComponent = ({ onClose }: ConfirmPaymentModalProps) => (
    <Modal
      className='!w-[45rem]'
      centered={true}
      open={isModalVisible}
      closable={false}
      footer={null}
    >
      <div className={`flex flex-col justify-center items-center gap-y-5`}>
        <ConfirmSvg className='w-10 h-10' />
        <h3 className='text-xl font-semibold text-turkishRose text-center'>
          Wohoooo! <br /> Your order has been placed successfully
        </h3>
        <p className='font-semibold text-sm text-[#A0A8AE]'>
          Pull a chair, sit back and relax as your order is on its way to you
        </p>
        <button
          type='button'
          onClick={() => navigate(`${APP_PREFIX_PATH}/`)}
          className='bg-turkishRose font-semibold text-sm text-white py-3 px-24 hover:opacity-75'
        >
          Continue Shopping
        </button>
        <button
          type='button'
          className='text-turkishRose font-semibold text-sm'
          onClick={() =>
            navigate(
              `${APP_PREFIX_PATH}/${RouteKeysEnum.dashboard}/${RouteDashboardKeysEnum.orders}`
            )
          }
        >
          View Order
        </button>
      </div>
    </Modal>
  );

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show)
  };
};

export default ConfirmPaymentModal;
