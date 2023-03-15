import AddressSvg from '@src/assets/svg/AddressSvg';
import AddNewAddressModal from '@src/components/modals/AddNewAddressModal';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProfile } from '@src/services/CustomerService';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import { useQuery } from '@tanstack/react-query';
import { Empty, Spin } from 'antd';
import { useEffect } from 'react';

interface MainAddressProps {
  address: CustomerAddressType;
  onChangeAddress: (address: CustomerAddressType | null) => void;
}

const MainAddress = ({ address, onChangeAddress }: MainAddressProps) => {
  return (
    <div className='bg-white w-full max-w-[50rem] rounded-2xl py-7 px-9 flex items-baseline gap-x-5'>
      <AddressSvg className='w-4 h-4' />
      <div className='flex flex-col gap-y-5 max-w-[20rem]'>
        <h3 className='text-OuterSpace text-xl font-semibold'>
          Primary Shipping Address
        </h3>
        <div>
          <h4 className='font-bold text-OuterSpace text-lg'>{address.name}</h4>
          <p className='font-medium text-lg text-Aluminium'>
            {address.line1}
            <br />
            {address.city} - {address.state}
          </p>
        </div>
        <p className='font-medium text-lg text-Aluminium'>{address.phone}</p>
      </div>
      <button
        type='button'
        onClick={() => onChangeAddress(address)}
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
  const { data: addressList, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.CUSTOMER_PROFILE],
    queryFn: async () => fetchProfile(),
    select(data: Awaited<ReturnType<typeof fetchProfile>>) {
      return data?.address || [];
    },
    initialData: undefined
  });

  const { ModalComponent, toggleModal, isModalVisible } = AddNewAddressModal();

  useEffect(() => {
    if (!isFetching && addressList && !selectedAddress) {
      setSelectedAddress(addressList[0]);
    }
  }, [addressList, isFetching, selectedAddress, setSelectedAddress]);

  return (
    <div className='flex flex-col gap-y-6 w-full max-w-3xl'>
      <h1
        className='font-bold text-2xl text-gray40'
        onClick={() => toggleModal(!isModalVisible)}
      >
        Shipping Address
      </h1>
      {isFetching && <Spin />}
      {!isFetching && !addressList && <Empty description='No address found!' />}
      {!isFetching && selectedAddress && (
        <MainAddress
          onChangeAddress={setSelectedAddress}
          address={selectedAddress}
        />
      )}
      <ModalComponent />
    </div>
  );
};

export default ShippingAddress;
