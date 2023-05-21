import { OrderDetailsType, OrderItemType } from '@src/types/API/OrdersType';
import OrderItemsList from './OrderItemsList';

interface OrderDetailsProps {
  order: OrderDetailsType;
  onOrderAgainHandler: (id: string) => void;
  onReturnHandler: (order: OrderItemType) => void;
  onTrackHandler: (order: OrderItemType) => void;
  onCancelHandler: (orderId: string, itemIds: string[]) => void;
}

export default function OrderDetails(props: OrderDetailsProps) {
  return (
    <div className='flex flex-col bg-[#E0E0E0] p-8 pt-4 gap-2 rounded-[20px]'>
      <span className='ml-10 font-semibold text-lg text-turkishRose'>
        &#40;{props.order.items.length}&#41; Items
      </span>
      <div className='flex items-center'>
        <OrderItemsList
          orderCreatedAt={props.order.createdAt}
          orderItems={props.order.items}
          onCancelHandler={props.onCancelHandler}
          onOrderAgainHandler={props.onOrderAgainHandler}
          onReturnHandler={props.onReturnHandler}
          onTrackHandler={props.onTrackHandler}
        />
      </div>
    </div>
  );
}
