import CartSvg from '@src/assets/svg/CartSvg';
import ProfileSvg from '@src/assets/svg/ProfileSvg';
import AddressMenuSvg from '@src/assets/svg/AddressMenuSvg';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux-hook';
import useAuthModals from '@src/hooks/useAuthModals';
import { Divider, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from '@src/configs/FirebaseConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { editNewAddress, fetchProfile } from '@src/services/CustomerService';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  CustomerAddNewAddressType,
  CustomerAddressType
} from '@src/types/API/CustomerType';
interface MenuItemProps {
  title?: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MenuItem = ({ title, Icon, onClick }: MenuItemProps): JSX.Element => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex items-center gap-x-2'
    >
      <Icon className='w-6 h-6' />
      {title && (
        <span className='text-base font-bold text-white'> {title} </span>
      )}
    </button>
  );
};

const AddressDropdown = () => {
  const { data: addressList, refetch } = useQuery({
    queryKey: [QueriesKeysEnum.CUSTOMER_PROFILE],
    queryFn: async () => fetchProfile(),
    select(data: Awaited<ReturnType<typeof fetchProfile>>) {
      return data?.address || [];
    },
    initialData: undefined
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

  const onSetPrimaryBtnHandler = async (address: CustomerAddressType) => {
    await onSetPrimaryMutation({
      id: address.id,
      data: {
        ...address,
        primary: true
      }
    });
    refetch();
  };

  const AddressItems: MenuProps['items'] = addressList?.map((address) => ({
    key: address.id,
    label: (
      <button
        type='button'
        className={`${address.primary ? 'font-bold ' : undefined}`}
        onClick={() => onSetPrimaryBtnHandler(address)}
      >
        {address.name.toUpperCase()}
      </button>
    )
  }));

  return (
    <Dropdown
      placement='bottom'
      trigger={['click']}
      menu={{ items: AddressItems }}
    >
      <MenuItem Icon={AddressMenuSvg} />
    </Dropdown>
  );
};

const AppSideMenu = (): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { toggleModal: SignInToggle, ModalComponent: SignInModalComponent } =
  //   SignInModal({});

  // const { toggleModal: SignUpToggle, ModalComponent: SignUpModalComponent } =
  //   SignUpModal();

  const { ModalComponent, showModal } = useAuthModals({});

  const handleSignInClick = () => {
    showModal();
  };
  const handleCartClick = () => {
    navigate(`${APP_PREFIX_PATH}/${RouteKeysEnum.cart}`);
  };
  const handleProfileClick = () => {
    navigate(`${APP_PREFIX_PATH}/${RouteKeysEnum.dashboard}`);
  };

  const SideMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button type='button' onClick={handleProfileClick}>
          Dashboard
        </button>
      )
    },
    {
      key: '2',
      label: (
        <button type='button' onClick={() => signOut(auth)}>
          Sign out
        </button>
      )
    }
  ];

  return (
    <section className='flex items-center ml-auto gap-x-5 whitespace-nowrap'>
      {!isLoggedIn && (
        <MenuItem
          onClick={handleSignInClick}
          title='Sign In'
          Icon={ProfileSvg}
        />
      )}
      {isLoggedIn && (
        <>
          <AddressDropdown />
          <Divider type='vertical' className='border-white h-6' />
          <Dropdown
            placement='bottom'
            trigger={['click']}
            menu={{ items: SideMenuItems }}
          >
            <MenuItem Icon={ProfileSvg} />
          </Dropdown>
        </>
      )}
      <Divider type='vertical' className='border-white h-6' />
      <MenuItem onClick={handleCartClick} title='Cart' Icon={CartSvg} />

      {/* <SignInModalComponent
        onSignUpRedirect={() => SignUpToggle(true)}
        onForgotPasswordRedirect={() => {}}
      />
      <SignUpModalComponent onSignInRedirect={() => SignInToggle(true)} /> */}
      <ModalComponent />
    </section>
  );
};

export default AppSideMenu;
