import ReturnOrderModal from '@src/components/modals/ReturnOrderModal';
import EmptyItem from '@src/components/shared/EmptyItem';
import OrderItem from '@src/components/shared/OrderItem';
import { APP_PREFIX_PATH, PRICE_CURRENCY } from '@src/configs/AppConfig';
import { OrderItemType } from '@src/types/API/OrdersType';
import { useNavigate } from 'react-router-dom';

interface OrdersListProps {
  orders: OrderItemType[];
  onOrderAgainHandler?: (id: string) => void;
  onReturnHandler?: (id: string) => void;
  onTrackHandler?: (id: string) => void;
  onCancelHandler?: (id: string) => void;
}

const OrdersList = ({ orders }: OrdersListProps) => {
  const navigate = useNavigate();
  const {
    ModalComponent: ReturnOrderModalComponent,
    toggleModal: toggleReturnOrderModal,
    setOrderItem: setReturnOrderItem
  } = ReturnOrderModal();

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
        <OrderItem
          order={order}
          key={order.id + i}
          infoContainerClassName='xl:w-1/2'
          className='bg-white md:h-48 w-full rounded-3xl p-5 flex flex-col gap-y-4 md:flex-row md:items-center justify-between xl:justify-start'
          controls={
            order.status === 'Delivered' ? (
              <div className='flex flex-col gap-y-1 font-medium'>
                <button
                  type='button'
                  className='text-white bg-turkishRose py-1 rounded-lg hover:opacity-75'
                >
                  Order again
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setReturnOrderItem(order);
                    toggleReturnOrderModal(true);
                  }}
                  className='text-turkishRose bg-transparent py-1 rounded-lg border border-turkishRose hover:bg-turkishRose hover:text-white'
                >
                  Return furniture
                </button>
              </div>
            ) : undefined
          }
        />
      );
    });
  };
  return (
    <ul className='w-11/12 flex flex-col max-w-7xl gap-y-5'>
      {renderOrders()}
      <ReturnOrderModalComponent />
    </ul>
  );
};

export default OrdersList;
