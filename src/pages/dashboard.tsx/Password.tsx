import EditPasswordForm from '@src/components/forms/EditPasswordForm';
import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';

const Password = () => {
  return (
    <DashboardLayout title='Password'>
      <div className='bg-white w-4/5 max-w-3xl rounded-2xl p-10 pb-5'>
        <EditPasswordForm />
      </div>
    </DashboardLayout>
  );
};

export default Password;
