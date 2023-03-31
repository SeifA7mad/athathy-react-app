import AddressSvg from '@src/assets/svg/dashboard/AddressSvg';
import OrdersSvg from '@src/assets/svg/dashboard/OrdersSvg';
import ProfileSvg from '@src/assets/svg/dashboard/ProfileSvg';
import ReturnsSvg from '@src/assets/svg/dashboard/ReturnsSvg';
import PasswordSvg from '@src/assets/svg/dashboard/PasswordSvg';
import { useAppSelector } from '@src/hooks/redux-hook';
import { NavLink } from 'react-router-dom';
import { RouteDashboardKeys } from '@src/configs/RoutesConfig';
import SignoutSvg from '@src/assets/svg/dashboard/SignoutSvg';
import { signOut } from '@firebase/auth';
import { auth } from '@src/configs/FirebaseConfig';
import SupportSvg from '@src/assets/svg/dashboard/SupportSvg';
import { useState } from 'react';

import { MenuUnfoldOutlined } from '@ant-design/icons';
import MenuButton from '@src/components/UI/MenuButton';
import FavouritesSvg from '@src/assets/svg/dashboard/FavouritesSvg';

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
    title: 'Favorites',
    icon: <FavouritesSvg />,
    link: 'favorites'
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
  },
  {
    title: 'Support',
    icon: <SupportSvg />,
    link: 'support'
  }
];

const NavigationList = ({ onClick }: { onClick?: () => void }) => {
  return (
    <ul className='flex flex-col gap-y-8 h-[70%] overflow-y-auto'>
      {navigationItems.map((item) => (
        <li
          key={item.title}
          className='text-whiteSmoke fill-whiteSmoke hover:fill-turkishRose hover:text-turkishRose'
        >
          <NavLink
            onClick={onClick}
            to={item.link}
            className={({ isActive }) =>
              `text-inherit fill-inherit font-semibold text-lg flex items-center gap-x-2 ${
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
  const [showNav, setShowNav] = useState(false);
  const user = useAppSelector((state) => state.user.auth);

  const toggleMenu = () => {
    setShowNav((prev) => !prev);
  };
  return (
    <>
      <aside
        className={`w-56 h-screen bg-white pt-10 pb-20 px-7 hidden md:flex flex-col gap-y-8 sticky top-[9.5rem] left-0 ${
          showNav && '!flex'
        }`}
      >
        <section className={`flex flex-col gap-y-1 ${showNav && 'mt-10'}`}>
          <h1 className='text-2xl text-gray40 font-bold'>
            Hello {user?.displayName}!
          </h1>
          <p className='text-gray40 text-sm'>{user?.email}</p>
        </section>
        <NavigationList onClick={showNav ? toggleMenu : () => {}} />
      </aside>
      <div
        className={`absolute top-44 left-8 transition-all ${
          showNav && 'translate-x-28'
        }`}
      >
        <MenuButton
          open={showNav}
          onClick={toggleMenu}
          className='z-50  md:!hidden'
        />
      </div>
    </>
  );
};

export default DashboardNavigation;
