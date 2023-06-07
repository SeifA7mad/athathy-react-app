import AddressSvg from '@src/assets/svg/AddressSvg';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import { Empty, Modal, Spin } from 'antd';
import { useState } from 'react';
import AddNewAddressModal from './AddNewAddressModal';
import EditSvg from '@src/assets/svg/EditSvg';
import HomeSvg from '@src/assets/svg/HomeSvg';

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
  }: ChangeAddressModalProps) => {
    const currentPrimaryAddressIdx = addressList.findIndex(
      (address) => address.primary
    );
    const [selectedAddressIdx, setSelectedAddressIdx] = useState<number>(
      currentPrimaryAddressIdx === -1 ? 0 : currentPrimaryAddressIdx
    );

    return (
      <>
        <Modal
          className='!w-[62.5rem] h-[37.5rem] rounded-3xl !bg-[#F9F9F9]'
          centered={true}
          open={isModalVisible}
          onCancel={onClose}
          closable={true}
          prefixCls='ant-change-address-modal'
          title={
            <h1 className='text-lg text-gray40 font-bold ml-2'>
              Select Delivery Address
            </h1>
          }
          footer={null}
        >
          <div className='w-full h-full flex flex-col justify-between'>
            {!!isFetching && <Spin />}
            {!isFetching && !addressList.length && (
              <Empty description='No addresses available' />
            )}
            {!isFetching && !!addressList.length && (
              <ul
                className={`flex flex-col gap-y-8 mt-10 max-h-[24rem] overflow-y-auto ${
                  addressList.length > 2 ? 'pr-2' : ''
                } scrollbar`}
              >
                {addressList.map((address, i) => (
                  <li
                    key={address.id}
                    className={`w-full !h-[9.0625rem] py-[.625rem] px-[2.5rem] cursor-pointer rounded-2xl flex shrink-0
                flex-col justify-between items-start hover:bg-gray-50 relative ${
                  selectedAddressIdx === i ? 'bg-gray-100' : 'bg-white'
                } ${address.primary ? 'order-first' : ''}`}
                    onClick={() => setSelectedAddressIdx(i)}
                  >
                    <div
                      className={`w-4/5 h-full flex flex-col justify-center gap-y-3`}
                    >
                      {address.primary && (
                        <h4 className='flex items-center gap-[.625rem] font-semibold text-[#333333] text-base'>
                          <HomeSvg /> Home
                        </h4>
                      )}
                      <div className='flex gap-x-16 font-medium text-sm text-gray40'>
                        <p className='w-24'>Name:</p>
                        <p>{address.name}</p>
                      </div>
                      <div className='flex gap-x-16 font-medium text-sm text-gray40'>
                        <p className='w-24'>Address:</p>
                        <p>
                          {address.line1} {address.country} {address.city}
                        </p>
                      </div>
                      <div className='flex gap-x-16 font-medium text-sm text-gray40'>
                        <p className='w-24'>Phone no:</p>
                        <p>{address.phone}</p>
                      </div>
                    </div>
                    <p
                      onClick={() => {
                        setEditData(address);
                        showAddAddressModal();
                      }}
                      className='flex items-center gap-x-3 text-gray40 font-medium text-sm absolute top-4 right-[1.8rem] z-20'
                    >
                      <EditSvg className='w-5 h-5' />
                      Edit
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <div className='w-full flex justify-between items-center px-[2.5rem]'>
              <button
                type='button'
                onClick={() => {
                  setEditData(null);
                  showAddAddressModal();
                }}
                className='font-semibold text-base text-turkishRose'
              >
                Add new address
              </button>
              <button
                onClick={() => {
                  onSelectAddress(addressList[selectedAddressIdx]);
                  setIsModalVisible(false);
                }}
                type='button'
                className='font-semibold text-sm disabled:cursor-not-allowed rounded-[.3125rem] text-white bg-turkishRose w-[10.9375rem] h-[3rem] flex items-center justify-center'
              >
                {confirmText}
              </button>
            </div>
          </div>
        </Modal>
        <AddAddressModal onClose={onClose} />
      </>
    );
  };

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show),
    isModalVisible
  };
};

export default ChangeAddressModal;
