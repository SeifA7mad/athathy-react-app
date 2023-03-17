import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';
import OrdersList from '@src/components/page-content/dashboard/OrdersList';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchOrdersItems } from '@src/services/OrdersSerivce';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';

const sortingItems = ['Shipped', 'Delivered'];

const Orders = () => {
  // const [sortingBy, setSortingBy] = useState<>();
  const { data: ordersData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.CUSTOMER_ORDERS],
    queryFn: async () => fetchOrdersItems(),
    initialData: []
  });
  return (
    <DashboardLayout title='Order Summary'>
      {!isFetching && <OrdersList orders={ordersData} />}
      {isFetching && <Spin />}
    </DashboardLayout>
  );
};

export default Orders;
