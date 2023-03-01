import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import * as CategoryService from '@src/services/CategoryService';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type NavItemType = {
  name: string;
  path: string;
};

interface NavigationLinksProps {
  title: string;
  navItems: NavItemType[];
}

interface NavigationLinkItemProps {
  navItem: NavItemType;
}

const CustomerServicesLinks: NavItemType[] = [
  { name: 'About Us', path: `${APP_PREFIX_PATH}/${RouteKeysEnum.AboutUs}` },
  {
    name: 'Terms & Conditions',
    path: `${APP_PREFIX_PATH}/${RouteKeysEnum.AboutUs}`
  },
  { name: 'FAQ', path: `${APP_PREFIX_PATH}/${RouteKeysEnum.AboutUs}` }
];

const NavigationLinkItem = ({ navItem }: NavigationLinkItemProps) => {
  return (
    <li>
      <Link to={navItem.path} className={`hover:text-turkishRose`}>
        {navItem.name}
      </Link>
    </li>
  );
};

const NavigationLinks = ({ title, navItems }: NavigationLinksProps) => {
  return (
    <div className="flex flex-col gap-y-5 whitespace-nowrap">
      <h3 className="text-xl font-semibold text-white underline underline-offset-[1rem]">
        {title}
      </h3>
      <ul className="flex flex-col text-white gap-y-3 list-disc font-medium ml-4">
        {navItems.map((navItem) => (
          <NavigationLinkItem key={navItem.name} navItem={navItem} />
        ))}
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
        path: `${APP_PREFIX_PATH}/${RouteKeysEnum.Categories}/${category.id}`
      }));
    },
    initialData: []
  });
  return (
    <div className="flex gap-x-14">
      <NavigationLinks
        title="Most Popular Categories"
        navItems={categoriesData}
      />
      <NavigationLinks
        title="Customer Services"
        navItems={CustomerServicesLinks}
      />
    </div>
  );
};

export default FooterNavigation;
