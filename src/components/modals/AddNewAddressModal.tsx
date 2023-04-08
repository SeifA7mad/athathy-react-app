import AddressSvg from '@src/assets/svg/AddressSvg';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import AddNewAddressForm from '../forms/AddNewAddressForm';
import { CustomerAddressType } from '@src/types/API/CustomerType';

interface AddNewAddressModalProps {
  onClose?: () => void;
}

interface AddNewAddressModalResponse {
  ModalComponent: (args: AddNewAddressModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
  isModalVisible: boolean;
  setEditData: (data: CustomerAddressType | null) => void;
}

const AddNewAddressModal = (): AddNewAddressModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<CustomerAddressType | null>(null);

  const ModalComponent = ({ onClose }: AddNewAddressModalProps) => (
    <Modal
      className='!w-[48rem]'
      centered={true}
      open={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
      }}
      title={
        <h1 className='text-xl text-OuterSpace font-bold flex items-center gap-x-3'>
          <AddressSvg className='w-4 h-5' />
          {!editData ? 'Add New Shipping Address' : 'Edit Shipping Address'}
        </h1>
      }
      footer={null}
    >
      <AddNewAddressForm
        addressData={editData || undefined}
        onSuccessfulSubmit={() => {
          setIsModalVisible(false);
          onClose && onClose();
        }}
      />
    </Modal>
  );

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show),
    isModalVisible,
    setEditData
  };
};

export default AddNewAddressModal;
