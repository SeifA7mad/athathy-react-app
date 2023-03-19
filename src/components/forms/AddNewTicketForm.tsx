import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchAPIConstants } from '@src/services/ConstantsService';
import { createTicket } from '@src/services/SupportService';
import { CreateSupportTicketPayload } from '@src/types/API/SupportType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';

const rules = {
  topic: [
    {
      required: true,
      message: 'Please input your support topic!'
    }
  ],
  subTopic: [
    {
      required: true,
      message: 'Please input your support subTopic!'
    }
  ]
} satisfies Record<string, Rule[]>;

const AddNewTicketForm = () => {
  const [form] = Form.useForm();

  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const { mutateAsync: createTicketMutation } = useMutation({
    mutationFn: async (data: CreateSupportTicketPayload) => createTicket(data)
  });

  const { data: supportData } = useQuery({
    queryKey: [QueriesKeysEnum.CONSTANTS],
    queryFn: async () => fetchAPIConstants(),
    initialData: undefined,
    select: (data: any) =>
      (data?.SUPPORT as {
        TOPICS: Record<string, string>;
        SUB_TOPICS: Record<string, Record<string, string>>;
      }) || undefined
  });

  const onFormSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (
        !supportData?.TOPICS[values.topic] ||
        !supportData?.SUB_TOPICS[values.topic][values.subTopic]
      ) {
        return;
      }

      message.loading('Adding ticket...', 0);
      await createTicketMutation({
        description: values.description,
        messages: [
          {
            message: values.description
          }
        ],
        topic: supportData?.TOPICS[values.topic],
        subTopic: supportData?.SUB_TOPICS[values.topic][values.subTopic]
      });
      message.success('Ticket added successfully');
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);
      message.error('Failed to add new ticket');
    } finally {
      setTimeout(() => {
        message.destroy();
      }, 1000);
    }
  };

  return (
    <Form
      layout='vertical'
      form={form}
      className='flex flex-col gap-y-5 w-full pt-3'
    >
      <Form.Item
        className='!text-base font-semibold text-whiteSmoke !m-0'
        name={'topic'}
        rules={rules.topic}
        label='What area do you need support on?'
      >
        <Select
          placeholder='Support Topic*'
          onChange={(key) => setSelectedTopic(key)}
        >
          {Object.keys(supportData?.TOPICS || {}).map((keys) => (
            <Select.Option key={keys} value={keys}>
              {supportData?.TOPICS[keys]}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        className='text-base font-semibold text-whiteSmoke !m-0'
        name={'subTopic'}
        rules={rules.subTopic}
        label='Please select the problem area in related to the topic.'
      >
        <Select placeholder='Sub Topic*'>
          {Object.keys(supportData?.SUB_TOPICS[selectedTopic] || {}).map(
            (keys) => (
              <Select.Option key={keys} value={keys}>
                {supportData?.SUB_TOPICS[selectedTopic][keys]}
              </Select.Option>
            )
          )}
        </Select>
      </Form.Item>
      <Form.Item
        className='text-base font-semibold text-whiteSmoke !m-0'
        name={'description'}
        label='Describe your problem where you need support.'
      >
        <Input.TextArea
          placeholder='Description'
          rows={4}
          maxLength={256}
          style={{ height: 180, resize: 'none' }}
        />
      </Form.Item>
      <button
        onClick={onFormSubmit}
        className=' bg-turkishRose text-white py-2 px-5 font-semibold text-base hover:bg-opacity-75 mr-auto rounded '
      >
        SUBMIT YOUR ENQUIRY
      </button>
    </Form>
  );
};

export default AddNewTicketForm;
