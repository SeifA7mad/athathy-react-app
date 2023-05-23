import ApartmentSvg from '@src/assets/svg/ApartmentSvg';
import HouseSvg from '@src/assets/svg/HouseSvg';
import OfficeSvg from '@src/assets/svg/OfficeSvg';
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
import { useEffect, useState } from 'react';

const rules = {
  firstName: [
    {
      required: true,
      message: 'Please input your first name!'
    }
  ],
  secondName: [
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
  building: [
    {
      required: false,
      message: 'Please input your building name / number!'
    }
  ],
  companyName: [
    {
      required: false,
      message: 'Please input your company name!'
    }
  ],
  houseNumber: [
    {
      required: false,
      message: 'Please input your house number!'
    }
  ],
  street: [
    {
      required: true,
      message: 'Please input your street name!'
    }
  ],
  floor: [
    {
      required: false,
      message: 'Please input your floor number!'
    }
  ],
  city: [
    {
      required: true,
      message: 'Please input your city!'
    }
  ],
  state: [
    {
      required: true,
      message: 'Please input your state!'
    }
  ]
} satisfies Record<string, Rule[]>;

interface AddNewAddressFormProps {
  onSuccessfulSubmit?: () => void;
  addressData?: CustomerAddressType;
}

const addressTypes = ['Apartment', 'House', 'Office'] as const;

const renderAddressIcon = (
  addressType: (typeof addressTypes)[number],
  currentAddressType: string
) => {
  switch (addressType) {
    case 'Apartment':
      return (
        <ApartmentSvg
          strokeColor={
            addressType === currentAddressType ? '#ffffff' : '#444853'
          }
        />
      );
    case 'House':
      return (
        <HouseSvg
          strokeColor={
            addressType === currentAddressType ? '#ffffff' : '#444853'
          }
        />
      );
    case 'Office':
      return (
        <OfficeSvg
          strokeColor={
            addressType === currentAddressType ? '#ffffff' : '#444853'
          }
        />
      );
  }
};

const AddNewAddressForm = ({
  onSuccessfulSubmit,
  addressData
}: AddNewAddressFormProps) => {
  const [form] = Form.useForm();

  const [addressType, setAddressType] =
    useState<(typeof addressTypes)[number]>('Apartment');

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
    queryKey: [QueriesKeysEnum.PINCODES],
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

      console.log(values); // TODO: Remove this

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
      <div className='flex gap-y-6 flex-col justify-between'>
        <div className='flex justify-between w-full px-4'>
          <div className='flex gap-2'>
            {addressTypes.map((addressKey) => (
              <button
                className={`flex items-center font-semibold py-2 px-2 justify-center gap-3 rounded-3xl border-2 w-32 border-sauvignon ${
                  addressKey === addressType
                    ? 'bg-turkishRose text-white'
                    : 'bg-white text-OuterSpace'
                }`}
                type='button'
                onClick={() => setAddressType(addressKey)}
              >
                {renderAddressIcon(addressKey, addressType)}
                {addressKey}
              </button>
            ))}
          </div>
          <Form.Item
            name={'primary'}
            valuePropName='checked'
            initialValue={false}
            className='!m-0  font-semibold text-OuterSpace'
          >
            <Checkbox className='!text-sm'>Set As Primary</Checkbox>
          </Form.Item>
        </div>
        <div className='flex flex-col gap-y-5 lg:flex-row flex-wrap justify-between'>
          <Form.Item
            className='text-sm font-semibold text-OuterSpace lg:w-[40%] !m-0'
            rules={rules.firstName}
            name={'name'}
            label='First Name'
          >
            <Input />
          </Form.Item>

          <Form.Item
            className='text-sm font-semibold text-OuterSpace lg:w-[40%] !m-0'
            rules={rules.secondName}
            name={'secondName'}
            label='Second Name'
          >
            <Input />
          </Form.Item>

          <Form.Item
            className='text-sm font-semibold text-OuterSpace lg:w-[40%] !m-0'
            rules={rules.phone}
            name={'phone'}
            label='Phone Number'
          >
            <Input />
          </Form.Item>

          {addressType === 'House' && (
            <Form.Item
              className='text-sm font-semibold text-OuterSpace lg:w-[40%] !m-0'
              rules={rules.houseNumber}
              name={'houseNumber'}
              label='House Number'
            >
              <Input />
            </Form.Item>
          )}

          {addressType === 'Office' && (
            <Form.Item
              className='text-sm font-semibold text-OuterSpace lg:w-[40%] !m-0'
              rules={rules.companyName}
              name={'company'}
              label='Company'
            >
              <Input />
            </Form.Item>
          )}

          {addressType === 'Apartment' && (
            <Form.Item
              className='text-sm font-semibold text-OuterSpace lg:w-[40%] !m-0'
              rules={rules.building}
              name={'building'}
              label='Building Name / Number'
            >
              <Input />
            </Form.Item>
          )}

          {(addressType === 'Apartment' || addressType === 'Office') && (
            <Form.Item
              className='text-sm font-semibold text-OuterSpace lg:w-[40%] !m-0'
              rules={rules.floor}
              name={'floor'}
              label='Floor'
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            className='text-sm font-semibold text-OuterSpace lg:w-[40%] !m-0'
            rules={rules.street}
            name={'street'}
            label='Street'
          >
            <Input />
          </Form.Item>

          <Form.Item
            className='text-sm font-semibold text-OuterSpace lg:w-[40%] !m-0'
            name={'state'}
            rules={rules.state}
            label='State'
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

          <Form.Item
            className='text-sm font-semibold text-OuterSpace lg:w-[40%] !m-0'
            rules={rules.city}
            name={'city'}
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
