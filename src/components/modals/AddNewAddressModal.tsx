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

  const ModalComponent = ({ onClose }: AddNewAddressModalProps) => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
      <Modal
        className='!w-[42.5rem] !h-[39rem]'
        centered={true}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        prefixCls='ant-add-new-address-modal'
        title={
          <h1 className='text-xl leading-[1.125rem] text-OuterSpace font-bold flex items-center gap-x-3 px-[2.125rem] pt-[2.0625rem]'>
            <AddressSvg className='w-4 h-5' />
            {!editData ? 'Add New Shipping Address' : 'Edit Shipping Address'}
          </h1>
        }
        footer={null}
      >
        {currentStep === 1 && (
          <div>
            <h1>Map Here</h1>
            <button onClick={() => setCurrentStep(currentStep + 1)}>
              Next
            </button>
          </div>
        )}
        {currentStep === 2 && (
          <AddNewAddressForm
            addressData={editData || undefined}
            onSuccessfulSubmit={() => {
              setIsModalVisible(false);
              onClose && onClose();
            }}
          />
        )}
      </Modal>
    );
  };

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show),
    isModalVisible,
    setEditData
  };
};

export default AddNewAddressModal;
