import { Form, Input, notification } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';

import { AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@src/configs/FirebaseConfig';
import { fetchProfile } from '@src/services/CustomerService';
interface SignInFormResponse {
  FormComponent: () => JSX.Element;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

interface SignInFormProps {
  onSubmit: () => void;
}

const rules = {
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
  password: [
    {
      required: true,
      message: 'Please input your password!'
    }
  ]
} satisfies Record<string, Rule[]>;

const SignInForm = ({ onSubmit }: SignInFormProps): SignInFormResponse => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);
      const userCredits = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const token = await userCredits.user.getIdToken();
      await fetchProfile(undefined, token);

      onSubmit();
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);
      auth.signOut();

      if (
        errorInfo?.code === AuthErrorCodes.INVALID_PASSWORD ||
        errorInfo?.code === AuthErrorCodes.USER_DELETED
      ) {
        notification.error({
          message: 'Invalid email or password'
        });
      } else {
        notification.error({
          message: 'Failed to sign in'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormComponent = () => (
    <Form form={form} className='flex flex-col gap-y-2'>
      <Form.Item rules={rules.email} className='border-b-2 pb-7' name={'email'}>
        <Input
          className='text-gray40 text-2xl font-medium'
          bordered={false}
          placeholder='Email'
        />
      </Form.Item>
      <Form.Item
        rules={rules.password}
        className='border-b-2 pb-7'
        name={'password'}
      >
        <Input.Password
          className='text-gray40 text-2xl font-medium'
          bordered={false}
          placeholder='Password'
        />
      </Form.Item>
    </Form>
  );
  return {
    FormComponent,
    onSubmit: onFormSubmit,
    isSubmitting: isSubmitting
  };
};

export default SignInForm;
