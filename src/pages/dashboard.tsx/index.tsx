import DashboardNavigation from '@src/components/page-content/dashboard/DashboardNavigation';
import { RouteDashboardKeysEnum } from '@src/configs/RoutesConfig';
import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import Address from './Address';
import Orders from './Orders';
import Returns from './Returns';
import Password from './Password';
import Support from './Support';

const Dashboard = () => {
  return (
    <div className='w-full h-full flex gap-x-10'>
      <DashboardNavigation />
      <Routes>
        <Route
          path={``}
          element={<Navigate to={`${RouteDashboardKeysEnum.profile}`} />}
        />
        <Route
          path={`${RouteDashboardKeysEnum.profile}`}
          element={<Profile />}
        />
        <Route
          path={`${RouteDashboardKeysEnum.address}`}
          element={<Address />}
        />
        <Route path={`${RouteDashboardKeysEnum.orders}`} element={<Orders />} />
        <Route
          path={`${RouteDashboardKeysEnum.returns}`}
          element={<Returns />}
        />
        <Route
          path={`${RouteDashboardKeysEnum.password}`}
          element={<Password />}
        />
        <Route
          path={`${RouteDashboardKeysEnum.support}/*`}
          element={<Support />}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
