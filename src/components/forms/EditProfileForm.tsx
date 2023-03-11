import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProfile, updateProfile } from '@src/services/CustomerService';
import { CustomerProfileType } from '@src/types/API/CustomerType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { Rule } from 'antd/es/form';
import { useEffect, useState } from 'react';

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
  ]
} satisfies Record<string, Rule[]>;

const EditProfileForm = () => {
  const [form] = Form.useForm();

  const { data: profileData } = useQuery({
    queryKey: [QueriesKeysEnum.CUSTOMER_PROFILE],
    queryFn: async () => fetchProfile(),
    initialData: null
  });

  const { mutateAsync: editProfile } = useMutation({
    mutationFn: async (data: CustomerProfileType) => updateProfile(data)
  });

  useEffect(() => {
    if (profileData) {
      form.setFieldsValue({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        emailSubscription: profileData.emailSubscription,
        smsSubscription: profileData.smsSubscription
      });
    }
  }, [profileData]);

  const onFormSubmit = async () => {
    try {
      message.loading('Updating profile...', 0);
      const values = await form.validateFields();

      values.emailSubscription = profileData?.emailSubscription || false;
      values.smsSubscription = profileData?.smsSubscription || false;

      await editProfile(values);
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
      <Button
        onClick={onFormSubmit}
        className='!ml-auto bg-turkishRose text-white hover:bg-opacity-75'
        type='ghost'
      >
        Save changes
      </Button>
      <p className='text-Aluminium font-medium text-sm'>
        Account created on{' '}
        {new Date(profileData?.createdAt || 0).toDateString()}
      </p>
    </Form>
  );
};

export default EditProfileForm;
