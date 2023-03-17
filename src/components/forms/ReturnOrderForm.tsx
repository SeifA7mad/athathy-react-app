import { returnOrderItem } from '@src/services/OrderService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';

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

const ReturnOrderForm = () => {
  const [form] = Form.useForm();

  const [currentStep, setCurrentStep] = useState<number>(0);

  const { mutateAsync: editProfile } = useMutation({
    mutationFn: async ({
      id,
      values
    }: {
      id: string;
      values: Parameters<typeof returnOrderItem>[1];
    }) => returnOrderItem(id, values)
  });

  const onFormSubmit = async () => {
    try {
      message.loading('Updating profile...', 0);
      const values = await form.validateFields();

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

  return <Form form={form} className='flex flex-col gap-y-6'></Form>;
};

export default ReturnOrderForm;
