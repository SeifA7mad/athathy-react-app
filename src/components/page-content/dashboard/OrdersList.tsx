import EmptyItem from '@src/components/shared/EmptyItem';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { OrderDetailsType, OrderItemType } from '@src/types/API/OrdersType';
import { useNavigate } from 'react-router-dom';
import OrderDetails from './OrderDetails';

interface OrdersListProps {
  orders: OrderDetailsType[];
  onOrderAgainHandler: (id: string) => void;
  onReturnHandler: (order: OrderItemType) => void;
  onTrackHandler: (order: OrderItemType) => void;
  onCancelHandler: (orderId: string, itemIds: string[]) => void;
}

const OrdersList = ({
  orders,
  onCancelHandler,
  onOrderAgainHandler,
  onReturnHandler,
  onTrackHandler
}: OrdersListProps) => {
  const navigate = useNavigate();

  const renderOrders = () => {
    if (!orders?.length)
      return (
        <EmptyItem
          title='Hi!! You have no recent orders'
          description={`Looks like you haven't placed an order in the past few months.`}
          buttonText='Go Home'
          onClick={() => navigate(`${APP_PREFIX_PATH}/`)}
        />
      );
    return orders.map((order, i) => {
      return (
        <OrderDetails
          key={order.id + i}
          order={order}
          onCancelHandler={onCancelHandler}
          onOrderAgainHandler={onOrderAgainHandler}
          onReturnHandler={onReturnHandler}
          onTrackHandler={onTrackHandler}
        />
      );
    });
  };
  return (
    <ul className='w-full md:w-11/12 flex flex-col max-w-7xl gap-y-5'>
      {renderOrders()}
    </ul>
  );
};

export default OrdersList;
