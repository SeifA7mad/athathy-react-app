import { Form, Input, message } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';

import { AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@src/configs/FirebaseConfig';
import { useAppDispatch } from '@src/hooks/redux-hook';

import { userActions } from '@src/store-redux/slices/user-slice';
interface SignInFormResponse {
  FormComponent: () => JSX.Element;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

interface SignInFormProps {
  onClose: () => void;
}

const rules = {
  email: [
    {
      required: true,
      message: 'Please input your email!'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input your password!'
    }
  ]
} satisfies Record<string, Rule[]>;

const SignInForm = ({ onClose }: SignInFormProps): SignInFormResponse => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const onFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const userToken = await userCredential.user?.getIdToken();

      dispatch(
        userActions.login({
          accessToken: userToken,
          displayName: userCredential.user?.displayName || '',
          email: userCredential.user.email || ''
        })
      );
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);

      if (
        errorInfo?.code === AuthErrorCodes.INVALID_PASSWORD ||
        errorInfo?.code === AuthErrorCodes.USER_DELETED
      ) {
        message.error('Invalid email or password');
      } else {
        message.error('Failed to sign in');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormComponent = () => (
    <Form form={form} className='flex flex-col gap-y-9'>
      <Form.Item rules={rules.email} className='border-b-2 pb-7' name={'email'}>
        <Input
          className='text-gray40 text-3xl font-medium'
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
          className='text-gray40 text-3xl font-medium'
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
