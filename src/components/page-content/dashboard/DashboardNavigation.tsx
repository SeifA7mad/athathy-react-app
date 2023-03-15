import AddressSvg from '@src/assets/svg/dashboard/AddressSvg';
import OrdersSvg from '@src/assets/svg/dashboard/OrdersSvg';
import ProfileSvg from '@src/assets/svg/dashboard/ProfileSvg';
import ReturnsSvg from '@src/assets/svg/dashboard/ReturnsSvg';
import PasswordSvg from '@src/assets/svg/dashboard/PasswordSvg';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux-hook';
import { NavLink } from 'react-router-dom';
import { RouteDashboardKeys } from '@src/configs/RoutesConfig';
import SignoutSvg from '@src/assets/svg/dashboard/SignoutSvg';
import { userActions } from '@src/store-redux/slices/user-slice';

const navigationItems: {
  title: string;
  icon: JSX.Element;
  link: RouteDashboardKeys;
}[] = [
  {
    title: 'Profile',
    icon: <ProfileSvg />,
    link: `profile`
  },
  {
    title: 'Orders',
    icon: <OrdersSvg />,
    link: `orders`
  },
  {
    title: 'Returns',
    icon: <ReturnsSvg />,
    link: `returns`
  },
  {
    title: 'Address',
    icon: <AddressSvg />,
    link: `address`
  },
  {
    title: 'Password ',
    icon: <PasswordSvg />,
    link: `password`
  }
];

const NavigationList = () => {
  return (
    <ul className='flex flex-col gap-y-8'>
      {navigationItems.map((item) => (
        <li key={item.title}>
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              `text-whiteSmoke fill-whiteSmoke font-semibold text-lg flex items-center gap-x-2 ${
                isActive && '!text-turkishRose !fill-turkishRose'
              }`
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const DashboardNavigation = () => {
  const user = useAppSelector((state) => state.user.auth);
  const dispatch = useAppDispatch();

  return (
    <aside className='w-52  min-h-[80vh] bg-white pt-10 pb-20 px-7 flex flex-col gap-y-8'>
      <section className='flex flex-col gap-y-1'>
        <h1 className='text-2xl text-gray40 font-bold'>
          Hello {user?.displayName}!
        </h1>
        <p className='text-gray40 text-sm'>{user?.email}</p>
      </section>
      <NavigationList />
      <button
        type='button'
        onClick={() => dispatch(userActions.logout())}
        className='text-whiteSmoke fill-whiteSmoke font-semibold text-lg flex items-center gap-x-2 -ml-[2px] mt-auto'
      >
        <SignoutSvg />
        <span>Sign out</span>
      </button>
    </aside>
  );
};

export default DashboardNavigation;
