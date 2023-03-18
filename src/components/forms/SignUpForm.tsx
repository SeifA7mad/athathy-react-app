import { Form, Input, message, Spin } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';

import { createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { auth } from '@src/configs/FirebaseConfig';
import { register } from '@src/services/CustomerService';
interface SignUpFormResponse {
  FormComponent: () => JSX.Element;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

interface SignUpFormProps {
  onSubmit: () => void;
}

const rules = {
  fullName: [
    {
      required: true,
      message: 'Please input your full name!'
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
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input your password!'
    }
  ]
} satisfies Record<string, Rule[]>;

const SignUpForm = ({ onSubmit }: SignUpFormProps): SignUpFormResponse => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const idTokenResult = await userCredential.user.getIdTokenResult(true);

      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        token: idTokenResult.token
      });

      message.success('Signed up successfully');
      onSubmit();
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);

      if (errorInfo?.code === AuthErrorCodes.EMAIL_EXISTS) {
        message.error('Email already exists');
      } else {
        message.error('Failed to sign up');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const FormComponent = () => (
    <Form form={form} className={`flex flex-col gap-y-4`}>
      <Form.Item
        rules={rules.fullName}
        className='border-b-2 pb-7'
        name={'firstName'}
      >
        <Input
          className='text-gray40 text-2xl font-medium'
          bordered={false}
          placeholder='First Name'
        />
      </Form.Item>
      <Form.Item
        rules={rules.lastName}
        className='border-b-2 pb-7'
        name={'lastName'}
      >
        <Input
          className='text-gray40 text-2xl font-medium'
          bordered={false}
          placeholder='Last Name'
        />
      </Form.Item>
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
          className='text-gray40 text-2xl font-semibold'
          bordered={false}
          placeholder='Password'
        />
      </Form.Item>
    </Form>
  );
  return {
    FormComponent,
    onSubmit: onFormSubmit,
    isSubmitting
  };
};

export default SignUpForm;
