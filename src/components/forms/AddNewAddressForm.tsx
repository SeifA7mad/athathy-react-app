import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchActivePincodes } from '@src/services/CityService';
import { addNewAddress, editNewAddress } from '@src/services/CustomerService';
import { fetchActiveStates } from '@src/services/StateService';
import {
  CustomerAddNewAddressType,
  CustomerAddressType
} from '@src/types/API/CustomerType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Checkbox, Form, Input, Select, message } from 'antd';
import { Rule } from 'antd/es/form';
import { useEffect } from 'react';

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
  ],
  phone: [
    {
      required: true,
      message: 'Please input your phone!'
    },
    {
      pattern: new RegExp(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      ),
      message: 'Please input a valid phone number!'
    }
  ],
  line1: [
    {
      required: true,
      message: 'Please input your address line 1!'
    }
  ],
  state: [
    {
      required: true,
      message: 'Please input your state!'
    }
  ],
  city: [
    {
      required: true,
      message: 'Please input your city!'
    }
  ]
} satisfies Record<string, Rule[]>;

interface AddNewAddressFormProps {
  onSuccessfulSubmit?: () => void;
  addressData?: CustomerAddressType;
}

const AddNewAddressForm = ({
  onSuccessfulSubmit,
  addressData
}: AddNewAddressFormProps) => {
  const [form] = Form.useForm();

  const { mutateAsync: addNewAddressMutation } = useMutation({
    mutationFn: async (data: CustomerAddNewAddressType) => addNewAddress(data)
  });

  const { mutateAsync: editNewAddressMutation } = useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: string;
      data: CustomerAddNewAddressType;
    }) => editNewAddress(id, data)
  });

  const { data: citiesList } = useQuery({
    queryKey: [QueriesKeysEnum.CITIES],
    queryFn: async () => fetchActivePincodes(),
    initialData: undefined
  });

  const { data: statesList } = useQuery({
    queryKey: [QueriesKeysEnum.STATES],
    queryFn: async () => fetchActiveStates(),
    initialData: undefined
  });

  useEffect(() => {
    if (addressData) {
      form.setFieldsValue({
        name: addressData.name,
        lastName: addressData.lastName,
        phone: addressData.phone,
        line1: addressData.line1,
        line2: addressData.line2,
        city: addressData.city,
        state: addressData.state,
        primary: addressData.primary
      });
    }
  }, [addressData]);

  const onFormSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (addressData) {
        message.loading('Updating address...', 0);
        await editNewAddressMutation({
          id: addressData.id,
          data: {
            ...values,
            zipcode: values.city,
            country: 'District'
          }
        });
        message.success('Address updated successfully');
      } else {
        message.loading('Adding address...', 0);
        await addNewAddressMutation({
          ...values,
          zipcode: values.city,
          country: 'District'
        });
        message.success('Address added successfully');
      }

      onSuccessfulSubmit?.();
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);
      message.error('Failed to add new address');
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
      <div className='flex gap-y-6 flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-y-5 lg:w-[45%] mb-6 lg:m-0'>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            rules={rules.firstName}
            name={'name'}
            label='First Name'
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            rules={rules.phone}
            name={'phone'}
            label='Phone Number'
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            rules={rules.line1}
            name={'line1'}
            label='Address Line 1'
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            rules={rules.state}
            name={'state'}
            label='State'
          >
            <Select
              showSearch
              filterOption={(input, { children }: any) => {
                return children.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {statesList?.map((item) => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className='flex flex-col gap-y-5 lg:w-[45%]'>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            rules={rules.lastName}
            name={'lastName'}
            label='Last Name'
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            name={''}
            label='Alternate Phone number'
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            name={''}
            label='Address Line 2'
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            name={'city'}
            rules={rules.city}
            label='City'
          >
            <Select
              showSearch
              filterOption={(input, { children }: any) => {
                return children.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {citiesList?.map((item) => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>
      <Form.Item
        className='text-sm font-semibold text-OuterSpace !m-0'
        name={'landmark'}
        label='Additional Information'
      >
        <Input.TextArea
          rows={4}
          maxLength={256}
          style={{ height: 120, resize: 'none' }}
        />
      </Form.Item>
      <Form.Item
        name={'primary'}
        valuePropName='checked'
        className='!m-0  font-semibold text-OuterSpace'
      >
        <Checkbox className='!text-sm'> Set As Primary</Checkbox>
      </Form.Item>
      <Button
        onClick={onFormSubmit}
        className=' bg-turkishRose text-white !h-10 font-semibold text-lg hover:bg-opacity-75'
        type='ghost'
      >
        Save Address
      </Button>
    </Form>
  );
};

export default AddNewAddressForm;
