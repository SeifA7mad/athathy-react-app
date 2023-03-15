import AddressSvg from '@src/assets/svg/AddressSvg';
import { Modal } from 'antd';
import { useState } from 'react';
import AddNewAddressForm from '../forms/AddNewAddressForm';

interface AddNewAddressModalProps {
  onClose?: () => void;
}

interface AddNewAddressModalResponse {
  ModalComponent: (args: AddNewAddressModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
  isModalVisible: boolean;
}

const AddNewAddressModal = (): AddNewAddressModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const ModalComponent = ({ onClose }: AddNewAddressModalProps) => (
    <Modal
      className='!w-[48rem]'
      centered={true}
      open={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
        onClose && onClose();
      }}
      title={
        <h1 className='text-xl text-OuterSpace font-bold flex items-center gap-x-3'>
          <AddressSvg className='w-4 h-5' />
          Add New Shipping Address
        </h1>
      }
      footer={null}
    >
      <AddNewAddressForm onSuccessfulSubmit={() => setIsModalVisible(false)} />
    </Modal>
  );

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show),
    isModalVisible
  };
};

export default AddNewAddressModal;
