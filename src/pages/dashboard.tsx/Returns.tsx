import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';
import ReturnList from '@src/components/page-content/dashboard/ReturnList';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchOrdersItems } from '@src/services/OrdersService';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';

const sortingItems = [
  'Return Requested',
  'Return Initiated',
  'Return Rescheduled',
  'Return Completed',
  'Items Returning Back',
  'Return Delayed',
  'Return Items Received',
  'Return Items Verification Failed',
  'Return Items Verification Completed',
  'Return Failed',
  'Return Cancelled'
];

const Returns = () => {
  // const [sortingBy, setSortingBy] = useState<>();
  const { data: ordersData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.CUSTOMER_RETURNS],
    queryFn: async () =>
      fetchOrdersItems(
        new URLSearchParams(sortingItems.map((s) => ['status', s]))
      ),
    initialData: []
  });
  return (
    <DashboardLayout title='Returns'>
      {!isFetching && <ReturnList orders={ordersData} />}
      {isFetching && <Spin />}
    </DashboardLayout>
  );
};

export default Returns;
