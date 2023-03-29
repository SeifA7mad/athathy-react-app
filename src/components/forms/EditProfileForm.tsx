import { Button, Form, Input, message } from 'antd';
import { Rule } from 'antd/es/form';
import { useEffect } from 'react';

import { auth } from '@src/configs/FirebaseConfig';

import { updateProfile, updateEmail, updatePhoneNumber } from 'firebase/auth';

const rules = {
  firstName: [
    {
      required: true,
      message: 'Please input your first name!'
    }
  ],
  lastName: [
    {
      required: true,
      message: 'Please input your last name!'
    }
  ],
  email: [
    {
      required: true,
      message: 'Please input your email!'
    },
    {
      type: 'email',
      message: 'Please input a valid email!'
    }
  ],
  phone: [
    {
      required: false,
      message: 'Please input your phone number!'
    },
    {
      pattern: new RegExp(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      ),
      message: 'Please input a valid phone number!'
    }
  ]
} satisfies Record<string, Rule[]>;

const EditProfileForm = () => {
  const [form] = Form.useForm();

  // const { data: profileData } = useQuery({
  //   queryKey: [QueriesKeysEnum.CUSTOMER_PROFILE],
  //   queryFn: async () => fetchProfile(),
  //   initialData: null
  // });

  const user = auth.currentUser;
  // const { mutateAsync: editProfile } = useMutation({
  //   mutationFn: async (data: CustomerProfileType) => updateProfileService(data)
  // });

  useEffect(() => {
    if (user && user.displayName) {
      const [firstName, lastName] = user.displayName.split(' ');
      form.setFieldsValue({
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        phone: user.phoneNumber
      });
    }
  }, [user]);

  const onFormSubmit = async () => {
    try {
      message.loading('Updating profile...', 0);
      const values = await form.validateFields();

      if (!user) return;

      await updateProfile(user, {
        displayName: `${values.firstName} ${values.lastName}`
      });

      if (values.email !== user.email) {
        await updateEmail(user, values.email);
      }

      // if (values.phone !== user.phoneNumber) {
      //   await updatePhoneNumber(user, values.phone);
      // }

      message.success('Profile updated successfully');
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);
      message.error('Failed to update profile');
    } finally {
      setTimeout(() => {
        message.destroy();
      }, 1000);
    }
  };

  return (
    <Form form={form} layout='vertical' className='flex flex-col'>
      <Form.Item
        rules={rules.firstName}
        className='!text-base font-semibold text-whiteSmoke'
        name={'firstName'}
        label='First name'
      >
        <Input className='text-firebrick text-lg font-semibold' />
      </Form.Item>
      <Form.Item
        rules={rules.lastName}
        className='!text-base font-semibold text-whiteSmoke'
        name={'lastName'}
        label='Last name'
      >
        <Input className='text-firebrick text-lg font-semibold' />
      </Form.Item>
      <Form.Item
        rules={rules.email}
        className='!text-base font-semibold text-whiteSmoke'
        name={'email'}
        label='Email Address'
      >
        <Input className='text-firebrick text-lg font-semibold' />
      </Form.Item>
      <Form.Item
        rules={rules.phone}
        className='!text-base font-semibold text-whiteSmoke'
        name={'phone'}
        label='Phone Number'
      >
        <Input className='text-firebrick text-lg font-semibold' />
      </Form.Item>
      <button
        onClick={onFormSubmit}
        className='!ml-auto bg-turkishRose text-base text-white hover:bg-opacity-75 p-2 rounded-lg'
        type='button'
      >
        Save changes
      </button>
      <p className='text-Aluminium font-medium text-sm mt-2'>
        Account created on{' '}
        {new Date(user?.metadata.creationTime || 0).toDateString()}
      </p>
    </Form>
  );
};

export default EditProfileForm;
