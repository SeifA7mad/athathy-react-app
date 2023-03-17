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
import { signOut } from '@firebase/auth';
import { auth } from '@src/configs/FirebaseConfig';

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
  const dispatch = useAppDispatch();
  return (
    <ul className='flex flex-col gap-y-8 h-[70%]'>
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
      <li className='mt-auto'>
        <button
          type='button'
          onClick={() => signOut(auth)}
          className='text-whiteSmoke fill-whiteSmoke font-semibold text-lg flex items-center gap-x-2 -ml-[2px] '
        >
          <SignoutSvg />
          <span>Sign out</span>
        </button>
      </li>
    </ul>
  );
};

const DashboardNavigation = () => {
  const user = useAppSelector((state) => state.user.auth);

  return (
    <aside className='w-52 h-screen bg-white pt-10 pb-20 px-7 flex flex-col gap-y-8 sticky top-14 left-0'>
      <section className='flex flex-col gap-y-1'>
        <h1 className='text-2xl text-gray40 font-bold'>
          Hello {user?.displayName}!
        </h1>
        <p className='text-gray40 text-sm'>{user?.email}</p>
      </section>
      <NavigationList />
    </aside>
  );
};

export default DashboardNavigation;
