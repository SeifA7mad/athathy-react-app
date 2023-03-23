import ReturnOrderModal from '@src/components/modals/ReturnOrderModal';
import TrackOrderModal from '@src/components/modals/TrackOrderModal';
import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';
import OrdersList from '@src/components/page-content/dashboard/OrdersList';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import {
  ReOrder,
  cancelOrder,
  fetchOrdersItems
} from '@src/services/OrdersService';
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
    mutationFn: async (data: { orderId: string; itemIds: string[] }) =>
      cancelOrder(data.orderId, data.itemIds)
  });

  const { mutateAsync: reorderMutation } = useMutation({
    mutationFn: async (data: { orderId: string }) => ReOrder(data.orderId)
  });

  const {
    ModalComponent: ReturnOrderModalComponent,
    toggleModal: toggleReturnOrderModal,
    setOrderItem: setReturnOrderItem
  } = ReturnOrderModal();

  const {
    ModalComponent: TrackOrderModalComponent,
    toggleModal: toggleTrackOrderModal,
    setOrderItem: setTrackOrderItem
  } = TrackOrderModal();

  const onCancelOrderHandler = async (orderId: string, itemIds: string[]) => {
    try {
      message.loading('Cancelling order...', 0);
      await cancelOrderMutation({ orderId, itemIds });

      message.success('Order cancelled successfully');
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      setTimeout(() => {
        message.destroy();
      }, 1000);
      refetch();
    }
  };

  const onReturnHandler = (order: OrderItemType) => {
    setReturnOrderItem(order);
    toggleReturnOrderModal(true);
  };

  const onTrackOrderHandler = (order: OrderItemType) => {
    setTrackOrderItem(order);
    toggleTrackOrderModal(true);
  };

  const onReOrderHandler = async (orderId: string) => {
    try {
      message.loading('Processing...', 0);
      await reorderMutation({ orderId });
      message.success('Order placed successfully');
    } catch (error: any) {
      message.error("Couldn't process your request");
    } finally {
      setTimeout(() => {
        message.destroy();
      }, 1000);
    }
  };

  return (
    <DashboardLayout title='Order Summary'>
      {!isFetching && (
        <OrdersList
          onReturnHandler={onReturnHandler}
          onTrackHandler={onTrackOrderHandler}
          onCancelHandler={onCancelOrderHandler}
          onOrderAgainHandler={onReOrderHandler}
          orders={ordersData}
        />
      )}
      {isFetching && <Spin />}
      <ReturnOrderModalComponent />
      <TrackOrderModalComponent />
    </DashboardLayout>
  );
};

export default Orders;
