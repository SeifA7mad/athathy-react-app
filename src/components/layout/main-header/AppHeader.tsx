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
import HamburgerMenuIconSvg from '@src/assets/svg/HamburgerMenuIconSvg';
import { Dropdown, MenuProps } from 'antd';
import SupportSvg from '@src/assets/svg/dashboard/SupportSvg';
import PasswordSvg from '@src/assets/svg/dashboard/PasswordSvg';
import AddressSvg from '@src/assets/svg/AddressSvg';
import ReturnsSvg from '@src/assets/svg/dashboard/ReturnsSvg';
import FavouritesSvg from '@src/assets/svg/dashboard/FavouritesSvg';
import OrdersSvg from '@src/assets/svg/dashboard/OrdersSvg';
import ProfileSvg from '@src/assets/svg/ProfileSvg';
import { RouteDashboardKeys, RouteKeysEnum } from '@src/configs/RoutesConfig';
import { Link } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import HamburgerProfileSvg from '@src/assets/svg/HamburgerProfileSvg';
import HamburgerOrdersSvg from '@src/assets/svg/HamburgerOrdersSvg';
import HamburgerFavoritesSvg from '@src/assets/svg/HamburgerFavoritesSvg';
import HamburgerAddressesSvg from '@src/assets/svg/HamburgerAddressesSvg';
import HamburgerReturnsSvg from '@src/assets/svg/HamburgerReturnsSvg';
import HamburgerSupportSvg from '@src/assets/svg/HamburgerSupportSvg';
import SignoutSvg from '@src/assets/svg/dashboard/SignoutSvg';
import HamburgerSignoutSvg from '@src/assets/svg/HamburgerSignoutSvg';
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
    icon: <HamburgerProfileSvg />,
    link: `profile`
  },
  {
    title: 'My Orders',
    icon: <HamburgerOrdersSvg />,
    link: `orders`
  },
  {
    title: 'Favorites',
    icon: <HamburgerFavoritesSvg />,
    link: 'favorites'
  },
  {
    title: 'My Addresses',
    icon: <HamburgerAddressesSvg />,
    link: `address`
  },
  {
    title: 'Returns',
    icon: <HamburgerReturnsSvg />,
    link: `returns`
  },
  {
    title: 'Support',
    icon: <HamburgerSupportSvg />,
    link: 'support'
  }
];

let SideMenuItems: MenuProps['items'] = [
  ...navigationItems.map((item, index) => ({
    key: item.title,
    label: (
      <Link
        to={`${APP_PREFIX_PATH}/${RouteKeysEnum.dashboard}/${item.link}`}
        className='flex gap-[.425rem] items-center justify-start w-full'
      >
        <span>{item.icon}</span>
        <span
          className={`text-base font-semibold ${
            index === 0 ? 'text-turkishRose' : 'text-whiteSmoke'
          }`}
        >
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
            className='flex gap-[.425rem] items-center justify-start w-full'
            onClick={() => signOut(auth)}
          >
            <span>
              <HamburgerSignoutSvg />
            </span>
            <span className={`text-base font-semibold text-whiteSmoke`}>
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
      className={`flex justify-between px-7 items-center w-full h-[5rem] bg-white`}
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
              Icon={<AddressMenuSvg />}
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
        onClose={refetchAddressList}
      />
    </section>
  );
};

export default AppHeader;
