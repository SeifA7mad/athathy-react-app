import { Form, Input } from 'antd';
import { useState } from 'react';

interface SignInFormResponse {
  FormComponent: () => JSX.Element;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

const SignInForm = (): SignInFormResponse => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      const values = await form.validateFields();
      // TODO: Implement sign in logic via API
    } catch (errorInfo) {
      // console.error('Failed:', errorInfo);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormComponent = () => (
    <Form form={form} className="flex flex-col gap-y-9">
      <Form.Item className="border-b-2 pb-7" name={'email'}>
        <Input
          className="text-[#666666] text-3xl font-medium"
          bordered={false}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item className="border-b-2 pb-7" name={'password'}>
        <Input.Password
          className="text-[#666666] text-3xl font-medium"
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

export default SignInForm;
