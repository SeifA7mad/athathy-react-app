import { Button, Form, Input, message } from 'antd';
import { Rule } from 'antd/es/form';
import { useEffect } from 'react';

import { auth } from '@src/configs/FirebaseConfig';

import { updateProfile, updateEmail } from 'firebase/auth';

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
      required: true,
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
    if (user) {
      form.setFieldsValue({
        firstName: user.displayName,
        lastName: '',
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
        displayName: values.firstName
      });

      if (values.email !== user.email) {
        await updateEmail(user, values.email);
      }

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
    <Form form={form} className='flex flex-col gap-y-6'>
      <Form.Item
        rules={rules.firstName}
        className='border-b-[1px] border-[#A0A8AE] pb-6'
        name={'firstName'}
      >
        <Input
          className='text-firebrick text-lg font-semibold'
          bordered={false}
          placeholder='First name'
        />
      </Form.Item>
      <Form.Item
        rules={rules.lastName}
        className='border-b-[1px] border-[#A0A8AE] pb-6'
        name={'lastName'}
      >
        <Input
          className='text-firebrick text-lg font-semibold'
          bordered={false}
          placeholder='Last name'
        />
      </Form.Item>
      <Form.Item
        rules={rules.email}
        className='border-b-[1px] border-[#A0A8AE] pb-6'
        name={'email'}
      >
        <Input
          className='text-firebrick text-lg font-semibold'
          bordered={false}
          placeholder='Email Address'
        />
      </Form.Item>
      <Form.Item
        rules={rules.phone}
        className='border-b-[1px] border-[#A0A8AE] pb-6'
        name={'phone'}
      >
        <Input
          className='text-firebrick text-lg font-semibold'
          bordered={false}
          placeholder='Phone Number'
        />
      </Form.Item>
      <Button
        onClick={onFormSubmit}
        className='!ml-auto bg-turkishRose text-white hover:bg-opacity-75'
        type='ghost'
      >
        Save changes
      </Button>
      {/* <p className='text-Aluminium font-medium text-sm'>
        Account created on{' '}
        {new Date(profileData?.createdAt || 0).toDateString()}
      </p> */}
    </Form>
  );
};

export default EditProfileForm;
