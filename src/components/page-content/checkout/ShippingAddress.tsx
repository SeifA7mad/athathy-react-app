import AddressSvg from '@src/assets/svg/AddressSvg';
import ChangeAddressModal from '@src/components/modals/ChangeAddressModal';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProfile } from '@src/services/CustomerService';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import { useQuery } from '@tanstack/react-query';
import { Empty, Spin } from 'antd';
import { useEffect } from 'react';

interface MainAddressProps {
  address: CustomerAddressType;
  onChangeBtnHandler: () => void;
}

const MainAddress = ({ address, onChangeBtnHandler }: MainAddressProps) => {
  return (
    <div className='bg-white w-full max-w-[50rem] rounded-2xl py-5 px-8 flex gap-x-5 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'>
      <div className='pt-1'>
        <AddressSvg className='w-[16.67px] h-[1.3019rem]' />
      </div>
      <div className='flex flex-col gap-y-[1.125rem] max-w-[20rem]'>
        <h3 className='text-OuterSpace text-xl font-semibold leading-[1.125rem]'>
          Primary Shipping Address
        </h3>
        <div className='flex flex-col gap-[.3125rem]'>
          <h4 className='font-bold text-OuterSpace text-lg leading-[1.375rem]'>
            {address.name}
          </h4>
          <p className='font-medium text-base text-Aluminium leading-[1.375rem]'>
            {address.line1}
            <br />
            {address.city} - {address.state}
          </p>
        </div>
        <p className='font-medium text-base text-Aluminium leading-[1.125rem]'>
          Phone number: {address.phone}
        </p>
      </div>
      <button
        type='button'
        onClick={onChangeBtnHandler}
        className='font-semibold text-lg text-turkishRose ml-auto'
      >
        {' '}
        Change{' '}
      </button>
    </div>
  );
};

interface ShippingAddressProps {
  selectedAddress: CustomerAddressType | null;
  setSelectedAddress: (address: CustomerAddressType | null) => void;
}

const ShippingAddress = ({
  selectedAddress,
  setSelectedAddress
}: ShippingAddressProps) => {
  const {
    data: addressList,
    isFetching,
    refetch
  } = useQuery({
    queryKey: [QueriesKeysEnum.CUSTOMER_PROFILE],
    queryFn: async () => fetchProfile(),
    select(data: Awaited<ReturnType<typeof fetchProfile>>) {
      return data?.address || [];
    },
    initialData: undefined
  });

  const { ModalComponent, toggleModal } = ChangeAddressModal();

  useEffect(() => {
    if (!isFetching && addressList && !selectedAddress) {
      setSelectedAddress(
        addressList.find((address) => address.primary) || addressList[0]
      );
    }
  }, [addressList, isFetching, selectedAddress, setSelectedAddress]);

  const onSelectAddressHandler = (address: CustomerAddressType) => {
    setSelectedAddress(address);
    toggleModal(false);
  };

  return (
    <div className='flex flex-col gap-y-6 w-full max-w-3xl'>
      <h1 className='font-bold text-[1.375rem] text-gray40'>
        Shipping Address
      </h1>
      {isFetching && <Spin />}
      {!isFetching && !selectedAddress && (
        <Empty description='No address found!' />
      )}
      {!isFetching && selectedAddress && (
        <MainAddress
          onChangeBtnHandler={() => toggleModal(true)}
          address={selectedAddress}
        />
      )}
      {addressList && addressList.length > 0 && (
        <ModalComponent
          onSelectAddress={onSelectAddressHandler}
          addressList={addressList}
          onClose={refetch}
          confirmText='Checkout'
        />
      )}
    </div>
  );
};

export default ShippingAddress;
