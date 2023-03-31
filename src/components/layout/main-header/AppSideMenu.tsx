import CartSvg from '@src/assets/svg/CartSvg';
import ProfileSvg from '@src/assets/svg/ProfileSvg';

import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux-hook';
import useAuthModals from '@src/hooks/useAuthModals';
import { Divider, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from '@src/configs/FirebaseConfig';

interface MenuItemProps {
  title?: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
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
      <Icon className='w-6 h-6' />
      {title && (
        <span className='text-base font-bold text-white'> {title} </span>
      )}
    </button>
  );
};

const AppSideMenu = (): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();
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
