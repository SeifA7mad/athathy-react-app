import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import {
  fetchActiveCities,
  fetchActiveDistrict,
  fetchActivePincodes
} from '@src/services/AddressService';
import { addNewAddress, editNewAddress } from '@src/services/CustomerService';
import { fetchActiveStates } from '@src/services/StateService';
import {
  CustomerAddNewAddressType,
  CustomerAddressType
} from '@src/types/API/CustomerType';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  message,
  notification
} from 'antd';
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
      pattern: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      message: 'Please input a valid phone number start with +'
    }
  ],
  line1: [
    {
      required: true,
      message: 'Please input your address line 1!'
    }
  ],
  country: [
    {
      required: true,
      message: 'Please input your country!'
    }
  ],
  city: [
    {
      required: true,
      message: 'Please input your city!'
    }
  ],
  emirate: [
    {
      required: true,
      message: 'Please input your emirate!'
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

  const { data: countriesList } = useQuery({
    queryKey: [QueriesKeysEnum.CITIES],
    queryFn: async () => fetchActiveDistrict(),
    initialData: undefined
  });

  const { data: emiratesList } = useQuery({
    queryKey: [QueriesKeysEnum.STATES],
    queryFn: async () => fetchActiveCities(),
    initialData: undefined
  });

  const { data: citiesList } = useQuery({
    queryKey: [QueriesKeysEnum.STATES],
    queryFn: async () => fetchActivePincodes(),
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
            ...values
          }
        });
        notification.success({
          message: 'Address updated successfully'
        });
      } else {
        message.loading('Adding address...', 0);
        await addNewAddressMutation({
          ...values
        });
        notification.success({
          message: 'Address added successfully'
        });
      }

      onSuccessfulSubmit?.();
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);
      notification.error({
        message: 'Failed to add new address'
      });
    } finally {
      message.destroy();
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
            rules={rules.country}
            name={'country'}
            label='Country'
          >
            <Select
              showSearch
              filterOption={(input, { children }: any) => {
                return children.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {countriesList?.map((item) => (
                <Select.Option key={item.name} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            rules={rules.city}
            name={'zipcode'}
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
            name={'Alternate Phone number'}
            label='Alternate Phone number'
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            name={'Address Line 2'}
            label='Address Line 2'
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace !m-0'
            name={'city'}
            rules={rules.emirate}
            label='Emirate'
          >
            <Select
              showSearch
              filterOption={(input, { children }: any) => {
                return children.toLowerCase().includes(input.toLowerCase());
              }}
            >
              {emiratesList?.map((item) => (
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
