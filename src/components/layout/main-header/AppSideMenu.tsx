import CartSvg from '@src/assets/svg/CartSvg';
import ProfileSvg from '@src/assets/svg/ProfileSvg';
import SignInModal from '@src/components/modals/SignInModal';
import SignUpModal from '@src/components/modals/SignUpModal';
import { useAppSelector } from '@src/hooks/redux-hook';
import { Divider } from 'antd';

interface MenuItemProps {
  title?: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MenuItem = ({ title, Icon, onClick }: MenuItemProps): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-x-2"
    >
      <Icon className="w-6 h-6" />
      {title && (
        <span className="text-base font-bold text-white"> {title} </span>
      )}
    </button>
  );
};

const AppSideMenu = (): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const { toggleModal: SignInToggle, ModalComponent: SignInModalComponent } =
    SignInModal();

  const { toggleModal: SignUpToggle, ModalComponent: SignUpModalComponent } =
    SignUpModal();

  const handleSignInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    SignInToggle(true);
  };
  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {};
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <section className="flex items-center ml-auto gap-x-5 whitespace-nowrap">
      {!isLoggedIn && (
        <MenuItem
          onClick={handleSignInClick}
          title="Sign In"
          Icon={ProfileSvg}
        />
      )}
      {isLoggedIn && (
        <MenuItem onClick={handleProfileClick} Icon={ProfileSvg} />
      )}
      <Divider type="vertical" className="border-white h-6" />
      <MenuItem onClick={handleCartClick} title="Cart" Icon={CartSvg} />

      <SignInModalComponent
        onSignUpRedirect={() => SignUpToggle(true)}
        onForgotPasswordRedirect={() => {}}
      />
      <SignUpModalComponent onSignInRedirect={() => SignInToggle(true)} />
    </section>
  );
};

export default AppSideMenu;
