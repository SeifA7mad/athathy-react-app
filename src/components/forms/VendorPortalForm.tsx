import { vendorMakeContactRequest } from '@src/services/VendorService';
import { VendorMakeContactRequestType } from '@src/types/API/VendorType';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Select, message, notification } from 'antd';

const rules = {
  storeName: [
    {
      required: true,
      message: 'Please input store name!'
    }
  ],
  websiteUrl: [
    {
      required: false
    }
  ],
  socialMedia: [
    {
      required: false
    }
  ],
  address: [
    {
      required: true,
      message: 'Please input address!'
    }
  ],
  firstName: [
    {
      required: true,
      message: 'Please input first name!'
    }
  ],
  secondName: [
    {
      required: true,
      message: 'Please input second name!'
    }
  ],
  mobileNumber: [
    {
      required: true,
      message: 'Please input mobile number!'
    },
    {
      pattern: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      message: 'Please input a valid phone number start with +'
    }
  ],
  email: [
    {
      required: true,
      message: 'Please input your email!'
    },
    {
      type: 'email',
      message: 'Please input a valid email!'
    }
  ]
};

export default function VendorPortalForm() {
  const [form] = Form.useForm();

  const { mutateAsync: sendContactRequest } = useMutation({
    mutationFn: async (data: VendorMakeContactRequestType) =>
      vendorMakeContactRequest(data)
  });

  const onFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      message.loading('Submitting form...', 0);
      // await mutation call
      await sendContactRequest(values);
      notification.success({
        message: 'Form submitted successfully'
      });
    } catch (errorInfo) {
      console.error('Failed:', errorInfo);
      notification.error({
        message: 'Failed to submit form'
      });
    } finally {
      message.destroy();
    }
  };

  return (
    <Form
      className='flex flex-col items-center w-[28.5rem] bg-white rounded-xl gap-[1.625rem] px-[1.8125rem] py-[2.5rem]'
      layout='vertical'
      form={form}
    >
      <h2 className='font-semibold text-[1.375rem]'>
        Fill out this form to get started
      </h2>
      <Form.Item
        className='text-sm text-whiteSmoke w-full !m-0'
        rules={rules.storeName}
        name={'store'}
        label='Store Name'
      >
        <Input className='bg-sauvignon text-OuterSpace' />
      </Form.Item>
      <div className='flex items-center justify-between w-full gap-[1.75rem]'>
        <Form.Item
          className='text-sm text-whiteSmoke w-[50%] !m-0'
          rules={rules.websiteUrl}
          name={'website'}
          label='Website URL'
        >
          <Input className='bg-sauvignon text-OuterSpace' />
        </Form.Item>
        <Form.Item
          className='text-sm text-whiteSmoke w-[50%]  !m-0'
          rules={rules.socialMedia}
          name={'social'}
          label='Social media'
        >
          <Input className='bg-sauvignon text-OuterSpace' />
        </Form.Item>
      </div>
      <Form.Item
        className='text-sm text-whiteSmoke w-full !m-0'
        rules={rules.address}
        name={'address'}
        label='Address'
      >
        <Input className='bg-sauvignon text-OuterSpace' />
      </Form.Item>
      <div className='flex items-center justify-between w-full gap-[1.75rem]'>
        <Form.Item
          className='text-sm text-whiteSmoke w-[50%] !m-0'
          rules={rules.firstName}
          name={'firstName'}
          label='First name'
        >
          <Input className='bg-sauvignon text-OuterSpace' />
        </Form.Item>
        <Form.Item
          className='text-sm text-whiteSmoke w-[50%]  !m-0'
          rules={rules.secondName}
          name={'lastName'}
          label='Second name'
        >
          <Input className='bg-sauvignon text-OuterSpace' />
        </Form.Item>
      </div>
      <Form.Item
        className='text-sm text-whiteSmoke w-full !m-0'
        rules={rules.mobileNumber}
        name={'phone'}
        label='Mobile number'
      >
        <Input className='bg-sauvignon text-OuterSpace' />
      </Form.Item>
      <Form.Item
        className='text-sm text-whiteSmoke w-full !m-0'
        rules={rules.email}
        name={'email'}
        label='Email address'
      >
        <Input className='bg-sauvignon text-OuterSpace' />
      </Form.Item>
      <Form.Item
        className='text-sm text-whiteSmoke w-full !m-0'
        name={'contactRole'}
        label='Contact role'
      >
        <Select prefixCls='ant-select-contact-role'>
          <Select.Option value='select'>Select</Select.Option>
        </Select>
      </Form.Item>

      <button
        className='bg-turkishRose rounded-[.25rem] w-full text-[#F5F5F5] font-extrabold text-lg py-[1.0625rem]'
        onClick={onFormSubmit}
      >
        Submit
      </button>
    </Form>
  );
}
