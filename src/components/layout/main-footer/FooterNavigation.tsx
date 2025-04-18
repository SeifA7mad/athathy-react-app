import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import {
  RouteDashboardKeysEnum,
  RouteKeysEnum
} from '@src/configs/RoutesConfig';
import { useAppSelector } from '@src/hooks/redux-hook';
import * as CategoryService from '@src/services/CategoryService';
import { fetchInformation } from '@src/services/InformationService';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type NavItemType = {
  name: string;
  path: string;
  requireAuth?: boolean;
};

interface NavigationLinksProps {
  title: string;
  navItems: NavItemType[];
}

interface NavigationLinkItemProps {
  navItem: NavItemType;
}

const VendorServicesLinks: NavItemType[] = [
  {
    name: 'Become a partner ',
    path: `${APP_PREFIX_PATH}/${RouteKeysEnum.vendorPortal}`
  }
];

const NavigationLinkItem = ({ navItem }: NavigationLinkItemProps) => {
  return (
    <li>
      <Link to={navItem.path} className={`hover:text-turkishRose`}>
        {navItem.name?.toUpperCase()}
      </Link>
    </li>
  );
};

const NavigationLinks = ({ title, navItems }: NavigationLinksProps) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <div className='flex flex-col gap-y-5 whitespace-nowrap'>
      <h3 className='text-xl font-semibold text-white underline underline-offset-[1rem]'>
        {title}
      </h3>
      <ul className='flex flex-col text-white gap-y-3 list-disc font-medium ml-4'>
        {navItems.map((navItem) => {
          if (navItem.requireAuth && !isLoggedIn) return null;
          return <NavigationLinkItem key={navItem.name} navItem={navItem} />;
        })}
      </ul>
    </div>
  );
};

const FooterNavigation = (): JSX.Element => {
  const { data: categoriesData } = useQuery({
    queryKey: [QueriesKeysEnum.MAIN_CATEGORIES],
    queryFn: async () => CategoryService.fetchMainCategories(),
    select(data) {
      return data.map((category) => ({
        name: category.name,
        path: `${APP_PREFIX_PATH}/${RouteKeysEnum.products}/${category.name}/${category.id}`
      }));
    },
    initialData: []
  });

  const { data: informationData } = useQuery({
    queryKey: [QueriesKeysEnum.INFORMATION],
    queryFn: async () => fetchInformation(),
    select(data) {
      return data.map((info) => ({
        name: info.name,
        path: `${APP_PREFIX_PATH}/${RouteKeysEnum.information}/${info.id}`
      }));
    },
    initialData: []
  });

  const CustomerServicesLinks: NavItemType[] = [
    ...informationData,
    {
      name: 'View orders',
      requireAuth: true,
      path: `${APP_PREFIX_PATH}/${RouteKeysEnum.dashboard}/${RouteDashboardKeysEnum.orders}`
    },
    {
      name: 'My account',
      requireAuth: true,
      path: `${APP_PREFIX_PATH}/${RouteKeysEnum.dashboard}/${RouteDashboardKeysEnum.profile}`
    }
  ];

  return (
    <div className='flex justify-between gap-y-10 w-2/3 flex-wrap -my-7'>
      <NavigationLinks
        title='Most Popular Categories'
        navItems={categoriesData}
      />
      <NavigationLinks
        title='Customer Services'
        navItems={CustomerServicesLinks}
      />
      <NavigationLinks title='Vendor Services' navItems={VendorServicesLinks} />
    </div>
  );
};

export default FooterNavigation;
