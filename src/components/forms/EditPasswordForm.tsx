import { Button, Form, Input, message } from 'antd';
import { Rule } from 'antd/es/form';
import { useEffect } from 'react';

import { auth } from '@src/configs/FirebaseConfig';

import { signOut, updatePassword, EmailAuthProvider } from 'firebase/auth';

const rules = {
  currentPassword: [
    {
      required: true,
      message: 'Please input your current password'
    }
  ],
  newPassword: [
    {
      required: true,
      message: 'Please input your new password'
    }
  ],
  repeatedNewPassword: [
    {
      required: true,
      message: 'Please confirm your password!'
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('newPassword') === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error('The two passwords that you entered do not match!')
        );
      }
    })
  ]
} satisfies Record<string, Rule[]>;

const EditPasswordForm = () => {
  const [form] = Form.useForm();

  const user = auth.currentUser;

  const onFormSubmit = async () => {
    try {
      message.loading('Updating Password...', 0);
      const values = await form.validateFields();

      if (!user || !user?.email) return;

      // EmailAuthProvider.credential(user.email, values.currentPassword);

      await updatePassword(user, values.newPassword);

      message.success('Password updated successfully');
      signOut(auth);
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);
      message.error('Failed to update Password, please logout and try again');
    } finally {
      setTimeout(() => {
        message.destroy();
      }, 1000);
    }
  };

  return (
    <Form layout={'vertical'} form={form} className='flex flex-col'>
      <Form.Item
        name='Password'
        label='Current Password'
        rules={rules.currentPassword}
        hasFeedback
        className='w-full md:w-5/1 !text-base'
      >
        <Input.Password className='h-9' />
      </Form.Item>
      <div className='flex flex-col md:flex-row justify-between'>
        <Form.Item
          name='newPassword'
          label='New Password'
          rules={rules.newPassword}
          hasFeedback
          className='w-full md:w-5/12 !text-base'
        >
          <Input.Password className='h-9' />
        </Form.Item>
        <Form.Item
          name='repeatNewPassword'
          label='Repeat New Password'
          rules={rules.repeatedNewPassword}
          dependencies={['newPassword']}
          hasFeedback
          className='w-full md:w-5/12 !text-base'
        >
          <Input.Password className='h-9' />
        </Form.Item>
      </div>
      <div className='flex items-center gap-x-14'>
        <button
          onClick={onFormSubmit}
          className=' bg-turkishRose text-white hover:bg-opacity-75 rounded-lg w-56 h-10 grid place-items-center font-semibold text-sm'
          type='button'
        >
          Set new password
        </button>
        <button
          onClick={() => form.resetFields()}
          type='button'
          className='font-bold text-sm text-OuterSpace'
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};

export default EditPasswordForm;
