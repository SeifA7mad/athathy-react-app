import OrderItem from '@src/components/shared/OrderItem';
import { OrderItemType } from '@src/types/API/OrdersType';

interface OrderItemsListProps {
  orderCreatedAt: number;
  orderItems: OrderItemType[];
  onOrderAgainHandler: (id: string) => void;
  onReturnHandler: (order: OrderItemType) => void;
  onTrackHandler: (order: OrderItemType) => void;
  onCancelHandler: (orderId: string, itemIds: string[]) => void;
}

export default function OrderItemsList(props: OrderItemsListProps) {
  return (
    <div className='flex flex-col gap-4'>
      {props.orderItems.map((orderItem, i) => (
        <OrderItem
          orderItem={orderItem}
          key={orderItem.id + i}
          orderCreatedAt={props.orderCreatedAt}
          className='bg-white  w-full rounded-3xl p-5 flex flex-wrap gap-y-4 items-center justify-between xl:justify-start'
          controls={
            <>
              {orderItem.status === 'Delivered' && (
                <div className='flex flex-col gap-y-1 font-medium'>
                  <button
                    onClick={() => props.onOrderAgainHandler(orderItem.id)}
                    type='button'
                    className='text-white bg-turkishRose py-1 rounded-lg hover:opacity-75'
                  >
                    Order again
                  </button>
                  {orderItem.isReturnable && (
                    <button
                      type='button'
                      onClick={() => props.onReturnHandler(orderItem)}
                      className='text-turkishRose bg-transparent py-1 rounded-lg border border-turkishRose hover:bg-turkishRose hover:text-white'
                    >
                      Return furniture
                    </button>
                  )}
                </div>
              )}{' '}
              {orderItem.status === 'Confirmed' && (
                <div className='flex flex-col gap-y-1 font-medium'>
                  <button
                    type='button'
                    onClick={() => props.onTrackHandler(orderItem)}
                    className='text-white bg-turkishRose py-1 rounded-lg hover:opacity-75'
                  >
                    Track
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      props.onCancelHandler(orderItem.orderId, [orderItem.id])
                    }
                    className='text-turkishRose bg-transparent py-1 rounded-lg border border-turkishRose hover:bg-turkishRose hover:text-white'
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          }
        />
      ))}
    </div>
  );
}
