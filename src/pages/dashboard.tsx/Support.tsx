import AddNewTicketForm from '@src/components/forms/AddNewTicketForm';
import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';
import TicketsTable from '@src/components/page-content/dashboard/TicketsTable';
import { NavLink, Navigate, Outlet, Route, Routes } from 'react-router-dom';

const Support = () => {
  return (
    <DashboardLayout title='Support'>
      <div className='w-full max-w-6xl flex gap-x-7 pb-1 border-b-[1px] border-[#CEBFB7] rounded-sm font-semibold text-lg text-[#A0A8AE]'>
        <NavLink
          to={'create-new-ticket'}
          className={({ isActive }) =>
            `hover:text-turkishRose ${isActive ? 'text-turkishRose' : ''}`
          }
        >
          Create new ticket
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:text-turkishRose ${isActive ? 'text-turkishRose' : ''}`
          }
          to={'tickets'}
        >
          My tickets
        </NavLink>
      </div>
      <Routes>
        <Route path={``} element={<Navigate to={'create-new-ticket'} />} />
        <Route
          path={'create-new-ticket'}
          element={
            <div className='w-2/6'>
              <AddNewTicketForm />
            </div>
          }
        />
        <Route path={'tickets'} element={<TicketsTable />} />
      </Routes>
      <Outlet />
    </DashboardLayout>
  );
};

export default Support;
