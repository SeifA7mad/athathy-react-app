import AddressSvg from '@src/assets/svg/AddressSvg';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import { Modal, Spin } from 'antd';
import { useState } from 'react';
import AddNewAddressModal from './AddNewAddressModal';
import EditSvg from '@src/assets/svg/EditSvg';

interface ChangeAddressModalProps {
  onClose?: () => void;
  addressList: CustomerAddressType[];
  confirmText: string;
  onSelectAddress: (address: CustomerAddressType) => void;
  isFetching?: boolean;
}

interface ChangeAddressModalResponse {
  ModalComponent: (args: ChangeAddressModalProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
  isModalVisible: boolean;
}

const ChangeAddressModal = (): ChangeAddressModalResponse => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    ModalComponent: AddAddressModal,
    toggleModal,
    setEditData
  } = AddNewAddressModal();

  const showAddAddressModal = () => {
    setIsModalVisible(false);
    toggleModal(true);
  };

  const ModalComponent = ({
    onClose,
    addressList,
    onSelectAddress,
    confirmText,
    isFetching
  }: ChangeAddressModalProps) => (
    <>
      <Modal
        className='!w-11/12 rounded-3xl !bg-sauvignon'
        centered={true}
        open={isModalVisible}
        closable={false}
        title={
          <h1 className='text-3xl text-gray40 font-bold ml-2'>
            Select Delivery Address
          </h1>
        }
        footer={null}
      >
        <div className='w-full flex flex-col gap-y-20'>
          {!!isFetching && <Spin />}
          {!isFetching && (
            <ul className='flex flex-col gap-y-10 mt-10 max-h-96 overflow-y-auto'>
              {addressList.map((address, i) => (
                <li
                  key={address.id}
                  onClick={() => onSelectAddress(address)}
                  className={`w-full border p-5 cursor-pointer bg-white rounded-2xl flex 
                flex-col justify-between items-start hover:bg-gray-50 relative ${
                  address.primary ? 'bg-gray-50 order-first' : undefined
                }`}
                >
                  <div className={`w-4/5 flex flex-col gap-y-3`}>
                    {address.primary && (
                      <h4 className='font-semibold text-[#333333] text-2xl'>
                        Home
                      </h4>
                    )}
                    <div className='flex gap-x-16 font-medium text-lg text-gray40'>
                      <p className='w-24'>Name:</p>
                      <p>{address.name}</p>
                    </div>
                    <div className='flex gap-x-16 font-medium text-lg text-gray40'>
                      <p className='w-24'>Address:</p>
                      <p>
                        {address.line1} {address.state} {address.city}
                      </p>
                    </div>
                    <div className='flex gap-x-16 font-medium text-lg text-gray40'>
                      <p className='w-24'>Phone no:</p>
                      <p>{address.phone}</p>
                    </div>
                  </div>
                  <p
                    onClick={() => {
                      setEditData(address);
                      showAddAddressModal();
                    }}
                    className='flex items-center gap-x-3 text-gray40 font-medium text-lg absolute top-4 right-4'
                  >
                    <EditSvg className='w-5 h-5' />
                    Edit
                  </p>
                </li>
              ))}
            </ul>
          )}
          <div className='w-full flex justify-between items-center'>
            <button
              type='button'
              onClick={() => {
                showAddAddressModal();
                setEditData(null);
              }}
              className='font-semibold text-xl text-turkishRose'
            >
              Add new address
            </button>
            <button
              onClick={() => setIsModalVisible(false)}
              type='button'
              className='font-semibold text-white bg-turkishRose w-60 h-14 flex items-center justify-center'
            >
              {confirmText}
            </button>
          </div>
        </div>
      </Modal>
      <AddAddressModal onClose={onClose} />
    </>
  );

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show),
    isModalVisible
  };
};

export default ChangeAddressModal;
