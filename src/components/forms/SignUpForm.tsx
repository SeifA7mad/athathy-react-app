import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';

interface SignUpFormResponse {
  FormComponent: () => JSX.Element;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
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

const SignUpForm = (): SignUpFormResponse => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);
      // TODO: Implement sign in logic via API
    } catch (errorInfo) {
      // console.error('Failed:', errorInfo);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormComponent = () => (
    <Form form={form} className="flex flex-col gap-y-9">
      <Form.Item
        rules={rules.fullName}
        className="border-b-2 pb-7"
        name={'firstName'}
      >
        <Input
          className="text-gray40 text-3xl font-medium"
          bordered={false}
          placeholder="First Name"
        />
      </Form.Item>
      <Form.Item
        rules={rules.lastName}
        className="border-b-2 pb-7"
        name={'lastName'}
      >
        <Input
          className="text-gray40 text-3xl font-medium"
          bordered={false}
          placeholder="Last Name"
        />
      </Form.Item>
      <Form.Item rules={rules.email} className="border-b-2 pb-7" name={'email'}>
        <Input
          className="text-gray40 text-3xl font-medium"
          bordered={false}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        rules={rules.password}
        className="border-b-2 pb-7"
        name={'password'}
      >
        <Input.Password
          className="text-gray40 text-3xl font-semibold"
          bordered={false}
          placeholder="Password"
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

export default SignUpForm;
