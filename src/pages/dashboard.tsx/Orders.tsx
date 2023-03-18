import ReturnOrderModal from '@src/components/modals/ReturnOrderModal';
import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';
import OrdersList from '@src/components/page-content/dashboard/OrdersList';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { cancelOrder, fetchOrdersItems } from '@src/services/OrdersService';
import { OrderItemType } from '@src/types/API/OrdersType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Spin, message } from 'antd';

const sortingItems = ['Shipped', 'Delivered'];

const Orders = () => {
  // const [sortingBy, setSortingBy] = useState<>();
  const {
    data: ordersData,
    isFetching,
    refetch
  } = useQuery({
    queryKey: [QueriesKeysEnum.CUSTOMER_ORDERS],
    queryFn: async () => fetchOrdersItems(),
    initialData: []
  });
  const { mutateAsync: cancelOrderMutation } = useMutation({
    mutationFn: async (data: { orderId: string }) => cancelOrder(data.orderId)
  });

  const {
    ModalComponent: ReturnOrderModalComponent,
    toggleModal: toggleReturnOrderModal,
    setOrderItem: setReturnOrderItem
  } = ReturnOrderModal();

  const onCancelOrderHandler = async (id: string) => {
    try {
      message.loading('Cancelling order...', 0);
      await cancelOrderMutation({ orderId: id });
      message.success('Order cancelled successfully');
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      setTimeout(() => {
        message.destroy();
      }, 1000);
    }
  };

  const onReturnHandler = (order: OrderItemType) => {
    setReturnOrderItem(order);
    toggleReturnOrderModal(true);
  };

  return (
    <DashboardLayout title='Order Summary'>
      {!isFetching && (
        <OrdersList
          onReturnHandler={onReturnHandler}
          onCancelHandler={onCancelOrderHandler}
          orders={ordersData}
        />
      )}
      {isFetching && <Spin />}
      <ReturnOrderModalComponent />
    </DashboardLayout>
  );
};

export default Orders;
