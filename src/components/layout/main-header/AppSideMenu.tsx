import CartSvg from '@src/assets/svg/CartSvg';
import ProfileSvg from '@src/assets/svg/ProfileSvg';

import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { useAppSelector } from '@src/hooks/redux-hook';
import useAuthModals from '@src/hooks/useAuthModals';
import { Badge, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchCart } from '@src/services/CartService';
import { useQuery } from '@tanstack/react-query';

interface MenuItemProps {
  title?: string;
  Icon: JSX.Element;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const MenuItem = ({
  title,
  Icon,
  onClick,
  className
}: MenuItemProps): JSX.Element => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex items-center gap-x-2 ${className}`}
    >
      {Icon}
      {title && (
        <span className='text-base font-bold text-turkishRose truncate overflow-hidden'>
          {title}
        </span>
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
        <MenuItem
          onClick={handleProfileClick}
          Icon={<ProfileSvg className='w-6 h-6' />}
        />
      )}
      <Divider type='vertical' className='border-turkishRose h-6' />

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
