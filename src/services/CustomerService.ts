import {
  CustomerAddNewAddressType,
  CustomerProfileType,
  CustomerUpdateProfileType
} from '@src/types/API/CustomerType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'customers';

export const register = (data: {
  firstName: string;
  lastName: string;
  displayImage?: string;
  token: string;
}) => {
  return fetch({
    url: `${api}/register`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`
    },
    data
  });
};

export const fetchProfile = async (params?: URLSearchParams) => {
  const response = await fetch({
    url: `${api}`,
    method: 'GET',
    params
  });

  return response.data as CustomerProfileType;
};

export const updateProfile = async (data: CustomerUpdateProfileType) => {
  return fetch({
    url: `${api}`,
    method: 'PUT',
    data
  });
};

export const addNewAddress = async (data: CustomerAddNewAddressType) => {
  return fetch({
    url: `${api}/address`,
    method: 'POST',
    data
  });
};

export const editNewAddress = async (
  id: string,
  data: CustomerAddNewAddressType
) => {
  return fetch({
    url: `${api}/address/${id}`,
    method: 'PUT',
    data
  });
};

export const deleteAddress = async (id: string) => {
  return fetch({
    url: `${api}/address/${id}`,
    method: 'DELETE'
  });
};
