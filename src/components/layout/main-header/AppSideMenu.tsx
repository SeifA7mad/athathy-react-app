import CartSvg from '@src/assets/svg/CartSvg';
import ProfileSvg from '@src/assets/svg/ProfileSvg';
import SignInModal from '@src/components/modals/SignInModal';
import SignUpModal from '@src/components/modals/SignUpModal';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux-hook';
import useAuthModals from '@src/hooks/useAuthModals';
import { userActions } from '@src/store-redux/slices/user-slice';
import { Divider, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

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

const AppSideMenu = (): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { toggleModal: SignInToggle, ModalComponent: SignInModalComponent } =
  //   SignInModal({});

  // const { toggleModal: SignUpToggle, ModalComponent: SignUpModalComponent } =
  //   SignUpModal();

  const { ModalComponent, showModal } = useAuthModals({});

  const handleSignInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    showModal();
  };
  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`${APP_PREFIX_PATH}/cart`);
  };
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

  const SideMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button onClick={() => dispatch(userActions.logout())}>Sign out</button>
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
        <Dropdown trigger={['click']} menu={{ items: SideMenuItems }}>
          <MenuItem Icon={ProfileSvg} />
        </Dropdown>
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
