import AddressMenuSvg from '@src/assets/svg/AddressMenuSvg';
import AppSearchbox from '@src/components/forms/AppSearchbox';
import ChangeAddressModal from '@src/components/modals/ChangeAddressModal';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { useAppSelector } from '@src/hooks/redux-hook';
import { editNewAddress, fetchProfile } from '@src/services/CustomerService';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import { useQuery } from '@tanstack/react-query';
import AppLogo from './AppLogo';
import AppSideMenu, { MenuItem } from './AppSideMenu';

const AppHeader = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const { data: addressList, refetch: refetchAddressList } = useQuery({
    queryKey: [QueriesKeysEnum.CUSTOMER_PROFILE],
    queryFn: async () => fetchProfile(),
    select(data: Awaited<ReturnType<typeof fetchProfile>>) {
      return data?.address || [];
    },
    initialData: undefined,
    enabled: isLoggedIn
  });

  const { ModalComponent: AddressModal, toggleModal: toggleAddressModal } =
    ChangeAddressModal();

  const onSetPrimaryBtnHandler = async (address: CustomerAddressType) => {
    await editNewAddress(address.id, {
      ...address,
      primary: true
    });
    toggleAddressModal(false);
    await refetchAddressList();
  };

  const primaryAddress = addressList?.find((address) => address.primary);

  return (
    <section
      className={`flex justify-between px-7 items-center w-full h-[5rem] bg-turkishRose`}
    >
      <div className='flex items-center gap-x-11'>
        <AppLogo />
        {isLoggedIn && (
          <MenuItem
            title={primaryAddress?.line1.slice(0, 10) || 'Select Address'}
            Icon={<AddressMenuSvg />}
            onClick={() => toggleAddressModal(true)}
          />
        )}
      </div>

      <div className='flex justify-between items-center w-3/4 gap-x-16'>
        <AppSearchbox
          className={`w-9/12 max-w-4xl h-10 hidden md:block`}
          inputClassName='text-lg md:text-base rounded-lg'
        />
        <AppSideMenu />
      </div>

      <AddressModal
        onSelectAddress={onSetPrimaryBtnHandler}
        addressList={addressList || []}
        confirmText='Confirm'
        onClose={refetchAddressList}
      />
    </section>
  );
};

export default AppHeader;
