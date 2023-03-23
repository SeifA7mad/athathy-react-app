import EditProfileForm from '@src/components/forms/EditProfileForm';
import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';

const Profile = () => {
  return (
    <DashboardLayout title='Profile'>
      <div className='bg-white w-11/12 md:max-w-4xl rounded-2xl p-10'>
        <EditProfileForm />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
