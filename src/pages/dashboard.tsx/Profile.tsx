import EditProfileForm from '@src/components/forms/EditProfileForm';
import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';

const Profile = () => {
  return (
    <DashboardLayout title='Profile'>
      <div className='bg-white w-4/5 max-w-5xl rounded-2xl p-10'>
        <EditProfileForm />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
