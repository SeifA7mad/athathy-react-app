import DashboardNavigation from '@src/components/page-content/dashboard/DashboardNavigation';
import { RouteDashboardKeysEnum } from '@src/configs/RoutesConfig';
import { Route, Routes } from 'react-router-dom';
import Profile from './Profile';

const Dashboard = () => {
  return (
    <div className='w-full h-full flex gap-x-10'>
      <DashboardNavigation />
      <Routes>
        <Route
          path={`${RouteDashboardKeysEnum.profile}`}
          element={<Profile />}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
