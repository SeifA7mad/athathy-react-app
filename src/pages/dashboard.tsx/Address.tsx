import AddNewAddressModal from '@src/components/modals/AddNewAddressModal';
import AddressCard from '@src/components/page-content/dashboard/AddressCard';
import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { deleteAddress, fetchProfile } from '@src/services/CustomerService';
import { CustomerAddressType } from '@src/types/API/CustomerType';
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

  const renderAddressList = () => {
    if (isFetching) {
      return <Spin />;
    }

    if (!addressList?.length) {
      return <Empty description='No addresses found!' />;
    }
    if (addressList?.length) {
      return (
        <>
          <AddressCard
            onEditBtnHandler={onEditBtnHandler}
            onDeleteBtnHandler={onDeleteAddressHandler}
            isPrimary={true}
            address={addressList[0]}
          />
          <div className='flex flex-col gap-y-6'>
            <h2 className='font-bold text-2xl text-gray40'>Saved Addresses</h2>
            <div className='grid grid-cols-2 gap-6'>
              {addressList.slice(1).map((address, index) => (
                <AddressCard
                  address={address}
                  isPrimary={false}
                  onEditBtnHandler={onEditBtnHandler}
                  onSetAsPrimaryBtnHandler={() => {}}
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
    <DashboardLayout title='Addresses'>
      <div className='flex flex-col gap-y-6 max-w-3xl mb-20'>
        {renderAddressList()}
        <button
          type='button'
          onClick={onAddNewAddressBtnHandler}
          className='bg-transparent border border-turkishRose rounded-lg text-turkishRose w-52 h-8 flex items-center justify-center'
        >
          Add New Address
        </button>
      </div>{' '}
      <ModalComponent onClose={refetch} />
    </DashboardLayout>
  );
};

export default Address;
