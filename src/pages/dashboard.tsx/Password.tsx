import EditPasswordForm from '@src/components/forms/EditPasswordForm';
import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';

const Password = () => {
  return (
    <DashboardLayout title='Password'>
      <div className='bg-white w-11/12 md:w-[48.0625rem] rounded-2xl p-[1.25rem] pt-[1.875rem] pb-[1.3125rem]'>
        <EditPasswordForm />
      </div>
    </DashboardLayout>
  );
};

export default Password;
