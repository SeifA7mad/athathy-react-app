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
