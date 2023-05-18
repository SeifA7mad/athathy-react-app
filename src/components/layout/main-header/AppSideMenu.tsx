import CartSvg from '@src/assets/svg/CartSvg';
import ProfileSvg from '@src/assets/svg/ProfileSvg';

import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { useAppSelector } from '@src/hooks/redux-hook';
import useAuthModals from '@src/hooks/useAuthModals';
import { Badge, Divider, Dropdown, MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { navigationItems } from '@src/components/page-content/dashboard/DashboardNavigation';
import { auth } from '@src/configs/FirebaseConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchCart } from '@src/services/CartService';
import { useQuery } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';

interface MenuItemProps {
  title?: string;
  Icon: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const MenuItem = ({
  title,
  Icon,
  onClick
}: MenuItemProps): JSX.Element => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex items-center gap-x-2'
    >
      {Icon}
      {title && (
        <span className='text-base font-bold text-turkishRose'> {title} </span>
      )}
    </button>
  );
};

const AppSideMenu = (): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const { data: cartProducts } = useQuery({
    queryKey: [QueriesKeysEnum.CART],
    queryFn: async () => fetchCart(),
    initialData: null,
    enabled: isLoggedIn
  });

  const navigate = useNavigate();

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
    ...navigationItems.map((item) => ({
      key: item.title,
      label: (
        <Link to={`${APP_PREFIX_PATH}/${RouteKeysEnum.dashboard}/${item.link}`}>
          {item.title}
        </Link>
      )
    })),
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
          Icon={<ProfileSvg className='w-6 h-6' />}
        />
      )}
      {isLoggedIn && (
        <>
          <Dropdown
            placement='bottom'
            trigger={['click']}
            menu={{ items: SideMenuItems }}
          >
            <MenuItem Icon={<ProfileSvg className='w-6 h-6' />} />
          </Dropdown>
        </>
      )}
      <Divider type='vertical' className='border-white h-6' />

      <MenuItem
        onClick={handleCartClick}
        title='Cart'
        Icon={
          <Badge
            count={cartProducts?.items?.length || 0}
            overflowCount={10}
            color='#997973'
          >
            <CartSvg className='w-6 h-6' />
          </Badge>
        }
      />

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
