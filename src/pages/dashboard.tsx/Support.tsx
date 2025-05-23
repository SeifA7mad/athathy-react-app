import AddNewTicketForm from '@src/components/forms/AddNewTicketForm';
import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';
import TicketsMessaging from '@src/components/page-content/dashboard/TicketsMessaging';
import TicketsTable from '@src/components/page-content/dashboard/TicketsTable';
import { NavLink, Navigate, Outlet, Route, Routes } from 'react-router-dom';

const Support = () => {
  return (
    <DashboardLayout title='Support'>
      <div className='w-full max-w-6xl'>
        <div className='w-full  flex gap-x-7 pb-[1.25rem] border-b-[1px] border-[#CEBFB7] rounded-sm font-semibold text-lg text-[#A0A8AE]'>
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
              <div className='w-11/12 md:max-w-xl'>
                <AddNewTicketForm />
              </div>
            }
          />
          <Route path={'tickets'} element={<TicketsTable />} />
          <Route path={'tickets/:id'} element={<TicketsMessaging />} />
        </Routes>
      </div>
      <Outlet />
    </DashboardLayout>
  );
};

export default Support;
