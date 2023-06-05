import AddressSvg from '@src/assets/svg/dashboard/AddressSvg';
import AppSearchbox from '@src/components/forms/AppSearchbox';
import ChangeAddressModal from '@src/components/modals/ChangeAddressModal';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { useAppSelector } from '@src/hooks/redux-hook';
import { editNewAddress, fetchProfile } from '@src/services/CustomerService';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import { useQuery } from '@tanstack/react-query';
import AppLogo from './AppLogo';
import AppSideMenu, { MenuItem } from './AppSideMenu';
import HamburgerMenuIconSvg from '@src/assets/svg/HamburgerMenuIconSvg';
import { Dropdown, MenuProps } from 'antd';
import SupportSvg from '@src/assets/svg/dashboard/SupportSvg';
import ReturnsSvg from '@src/assets/svg/dashboard/ReturnsSvg';
import FavouritesSvg from '@src/assets/svg/dashboard/FavouritesSvg';
import OrdersSvg from '@src/assets/svg/dashboard/OrdersSvg';
import ProfileSvg from '@src/assets/svg/dashboard/ProfileSvg';
import { RouteDashboardKeys, RouteKeysEnum } from '@src/configs/RoutesConfig';
import { Link } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';

import SignoutSvg from '@src/assets/svg/dashboard/SignoutSvg';
import { useEffect } from 'react';

import { signOut } from 'firebase/auth';
import { auth } from '@src/configs/FirebaseConfig';

export const navigationItems: {
  title: string;
  icon: JSX.Element;
  link: RouteDashboardKeys;
}[] = [
  {
    title: 'My Profile',
    icon: <ProfileSvg />,
    link: `profile`
  },
  {
    title: 'My Orders',
    icon: <OrdersSvg />,
    link: `orders`
  },
  {
    title: 'Favorites',
    icon: <FavouritesSvg />,
    link: 'favorites'
  },
  {
    title: 'My Addresses',
    icon: <AddressSvg />,
    link: `address`
  },
  {
    title: 'Returns',
    icon: <ReturnsSvg />,
    link: `returns`
  },
  {
    title: 'Support',
    icon: <SupportSvg />,
    link: 'support'
  }
];

let SideMenuItems: MenuProps['items'] = [
  ...navigationItems.map((item) => ({
    key: item.title,
    label: (
      <Link
        to={`${APP_PREFIX_PATH}/${RouteKeysEnum.dashboard}/${item.link}`}
        className='flex gap-[.425rem] items-center justify-start w-full fill-whiteSmoke hover:fill-turkishRose hover:text-turkishRose'
      >
        {item.icon}
        <span className={`text-base font-semibold text-whiteSmoke`}>
          {item.title}
        </span>
      </Link>
    )
  }))
];

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

  useEffect(() => {
    if (isLoggedIn) {
      const newSideMenuItems = SideMenuItems!.filter(
        (item) => item?.key !== 'signout'
      );
      newSideMenuItems.push({
        key: 'signout',
        label: (
          <button
            className='text-inherit fill-inherit flex gap-[.425rem] items-center justify-start w-full hover:fill-turkishRose hover:text-turkishRose'
            onClick={() => signOut(auth)}
          >
            <SignoutSvg />
            <span
              className={`text-base font-semibold text-whiteSmoke hover:text-turkishRose`}
            >
              Sign Out
            </span>
          </button>
        )
      });
      SideMenuItems = newSideMenuItems;
    }
  }, [isLoggedIn]);

  return (
    <section
      className={`flex justify-between px-7 items-center w-full h-[4.0625rem] bg-white`}
    >
      <div className='flex items-center gap-x-11'>
        <Dropdown
          placement='bottomRight'
          trigger={['click']}
          menu={{ items: SideMenuItems }}
          prefixCls='ant-hamburger-menu-dropdown'
        >
          <button type='button'>
            <HamburgerMenuIconSvg stroke='#997973' className='cursor-pointer' />
          </button>
        </Dropdown>
        <AppLogo />
        {isLoggedIn && (
          <div className='text-turkishRose'>
            <span className='text-xs font-bold'>Deliver to</span>
            <MenuItem
              title={primaryAddress?.line1 || 'Select Address'}
              Icon={<AddressSvg />}
              onClick={() => toggleAddressModal(true)}
              className='w-44'
            />
          </div>
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
        onClose={() => toggleAddressModal(false)}
      />
    </section>
  );
};

export default AppHeader;
