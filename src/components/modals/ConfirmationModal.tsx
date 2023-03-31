import ConfirmSvg from '@src/assets/svg/CofirmSvg';
import ConfirmationSvg from '@src/assets/svg/ConfirmationSvg';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ConfirmationModalProps {
  onClose?: () => void;
  confirmationTxt: string;
  confirmationSubTxt?: string;
}

interface ConfirmationModalResponse {
  ModalComponent: (args: ConfirmationModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
}

const ConfirmationModal = (): ConfirmationModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ModalComponent = ({
    onClose,
    confirmationTxt,
    confirmationSubTxt
  }: ConfirmationModalProps) => (
    <Modal
      className='!w-[39rem]'
      centered={true}
      open={isModalVisible}
      closable={false}
      footer={null}
    >
      <div className={`flex flex-col justify-center items-center gap-y-5`}>
        <ConfirmationSvg className='w-12 h-12' />
        <div>
          <h3 className='text-xl font-semibold text-turkishRose text-center'>
            {confirmationTxt}
          </h3>
          {confirmationSubTxt && (
            <p className='font-semibold text-sm text-[#A0A8AE] text-center'>
              {confirmationSubTxt}
            </p>
          )}
        </div>
        <button
          type='button'
          onClick={() => {
            setIsModalVisible(false);
            onClose && onClose();
          }}
          className='font-semibold text-sm text-whiteSmoke'
        >
          Go back
        </button>
      </div>
    </Modal>
  );

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show)
  };
};

export default ConfirmationModal;
