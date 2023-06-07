import AddNewAddressModal from '@src/components/modals/AddNewAddressModal';
import AddressCard from '@src/components/page-content/dashboard/AddressCard';
import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import {
  deleteAddress,
  editNewAddress,
  fetchProfile
} from '@src/services/CustomerService';
import {
  CustomerAddNewAddressType,
  CustomerAddressType
} from '@src/types/API/CustomerType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Empty, Spin } from 'antd';

const Address = () => {
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

  const { mutateAsync: onDeleteAddressMutation } = useMutation({
    mutationFn: async (data: { id: string }) => deleteAddress(data.id)
  });

  const { mutateAsync: onSetPrimaryMutation } = useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: string;
      data: CustomerAddNewAddressType;
    }) => editNewAddress(id, data)
  });

  const { ModalComponent, setEditData, toggleModal } = AddNewAddressModal();

  const onEditBtnHandler = (address: CustomerAddressType) => {
    setEditData(address);
    toggleModal(true);
  };

  const onAddNewAddressBtnHandler = () => {
    setEditData(null);
    toggleModal(true);
  };

  const onDeleteAddressHandler = async (id: string) => {
    await onDeleteAddressMutation({ id });
    refetch();
  };

  const onSetAsPrimaryBtnHandler = async (address: CustomerAddressType) => {
    await onSetPrimaryMutation({
      id: address.id,
      data: {
        ...address,
        primary: true
      }
    });
    refetch();
  };

  const renderAddressList = () => {
    if (isFetching) {
      return <Spin />;
    }

    if (!addressList?.length) {
      return <Empty description='No addresses found!' />;
    }
    if (addressList?.length) {
      const primaryAddress = addressList.find((address) => address?.primary);

      if (!primaryAddress) {
        return <Empty description='No addresses found!' />;
      }
      return (
        <>
          <AddressCard
            onEditBtnHandler={onEditBtnHandler}
            onDeleteBtnHandler={onDeleteAddressHandler}
            isPrimary={true}
            address={primaryAddress}
          />
          <div className='flex flex-col gap-y-6'>
            <h2 className='font-bold text-2xl text-gray40'>Saved Addresses</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {addressList
                .filter((address) => address?.id !== primaryAddress?.id)
                .map((address, index) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    isPrimary={false}
                    onEditBtnHandler={onEditBtnHandler}
                    onSetAsPrimaryBtnHandler={onSetAsPrimaryBtnHandler}
                    onDeleteBtnHandler={onDeleteAddressHandler}
                    addressIndex={index + 2}
                  />
                ))}
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <DashboardLayout
      title='Addresses'
      pageAction={
        <button
          type='button'
          onClick={onAddNewAddressBtnHandler}
          className='bg-transparent border border-turkishRose rounded-lg shadow-md text-turkishRose w-52 h-8 flex items-center justify-center'
        >
          Add New Address
        </button>
      }
    >
      <div className='flex flex-col gap-y-6 max-w-3xl'>
        {renderAddressList()}
      </div>{' '}
      <ModalComponent onClose={refetch} />
    </DashboardLayout>
  );
};

export default Address;
