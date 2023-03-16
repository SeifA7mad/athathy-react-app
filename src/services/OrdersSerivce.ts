import { OrderItemType } from '@src/types/API/OrdersType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'order/customer';

export const fetchOrdersItems = async (
  params?: URLSearchParams
): Promise<OrderItemType[]> => {
  const response = await fetch({
    url: `${api}/view_all_items`,
    method: 'GET',
    params
  });

  return response.data;
};
