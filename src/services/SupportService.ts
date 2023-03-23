import {
  CreateSupportTicketPayload,
  SupportTicketType
} from '@src/types/API/SupportType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'support';

export const createTicket = (data: CreateSupportTicketPayload) => {
  return fetch({
    url: `${api}/createTicket`,
    method: 'POST',
    data
  });
};

export const getAllTickets = () => {
  return fetch({
    url: `${api}/getAll`,
    method: 'GET'
  }) as Promise<SupportTicketType[]>;
};


export const getTicketById = (id: string) => {
  return fetch({
    url: `${api}/getOne/${id}`,
    method: 'GET'
  }) as Promise<SupportTicketType>;
}

export const AddMessage = (id: string, message: string) => {
  return fetch({
    url: `${api}/addMessage/${id}`,
    method: 'POST',
    data: { message }
  });
}

export const closeTicket = (id: string) => {
  return fetch({
    url: `${api}/closeTicket/${id}`,
    method: 'DELETE'
  });
}