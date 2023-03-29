import { Form, Input, message, notification } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';

import {
  AuthErrorCodes,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '@src/configs/FirebaseConfig';
interface ForgetPasswordFormResponse {
  FormComponent: () => JSX.Element;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

interface ForgetPasswordFormProps {
  onSubmit: () => void;
}

const rules = {
  email: [
    {
      required: true,
      message: 'Please input your email!'
    }
  ]
} satisfies Record<string, Rule[]>;

const ForgetPasswordForm = ({
  onSubmit
}: ForgetPasswordFormProps): ForgetPasswordFormResponse => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);
      await sendPasswordResetEmail(auth, values.email);
      notification.success({
        message: 'Please check your email to reset your password'
      });
      onSubmit();
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);

      if (
        errorInfo?.code === AuthErrorCodes.INVALID_PASSWORD ||
        errorInfo?.code === AuthErrorCodes.USER_DELETED
      ) {
        notification.error({
          message: 'Invalid email'
        });
      } else {
        notification.error({
          message: 'Failed to reset password'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormComponent = () => (
    <Form form={form} className='flex flex-col gap-y-4'>
      <Form.Item rules={rules.email} className='border-b-2 pb-7' name={'email'}>
        <Input
          className='text-gray40 text-2xl font-medium'
          bordered={false}
          placeholder='Email'
        />
      </Form.Item>
      <button
        onClick={onFormSubmit}
        type='button'
        className='w-full text-turkishRose font-bold text-4xl pt-8 md:pt-14'
      >
        Reset
      </button>
    </Form>
  );
  return {
    FormComponent,
    onSubmit: onFormSubmit,
    isSubmitting: isSubmitting
  };
};

export default ForgetPasswordForm;
