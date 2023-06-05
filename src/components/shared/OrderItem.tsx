import { PRICE_CURRENCY } from '@src/configs/AppConfig';
import { OrderItemType } from '@src/types/API/OrdersType';

interface OrderItemProps {
  orderCreatedAt: number;
  orderItem: OrderItemType;
  controls?: JSX.Element;
  className?: string;
  infoContainerClassName?: string;
}

const orderStatus: Record<
  OrderItemType['status'],
  { color: string; text: string }
> = {
  Delivered: {
    color: 'text-[#30B700] border-[#30B700]',
    text: 'Delivered'
  },
  Dispatched: {
    color: 'text-[#FFCD19] border-[#FFCD19]',
    text: 'Dispatched'
  },
  Confirmed: {
    color: 'text-[#FFCD19] border-[#FFCD19]',
    text: 'Confirmed'
  },
  'Payment Failed': {
    color: 'text-[#FF0000] border-[#FF0000]',
    text: 'Payment Failed'
  },
  Pending: {
    color: 'text-[#FFCD19] border-[#FFCD19]',
    text: 'Pending'
  },
  'Pending Confirmation': {
    color: 'text-[#FFCD19] border-[#FFCD19]',
    text: 'Pending'
  },
  Cancelled: {
    color: 'text-[#FF0000] border-[#FF0000]',
    text: 'Cancelled'
  },
  'Return Requested': {
    color: 'text-[#FF0000] border-[#FF0000]',
    text: 'Return Requested'
  },
  'Out for Delivery': {
    color: 'text-[#FFCD19] border-[#FFCD19]',
    text: 'Out for Delivery'
  },
  Shipped: {
    color: 'text-[#FFCD19] border-[#FFCD19]',
    text: 'Shipped'
  },
  Returned: {
    color: 'text-[#30B700] border-[#30B700]',
    text: 'Returned'
  },
  'Payment Pending': {
    color: 'text-[#FFCD19] border-[#FFCD19]',
    text: 'Payment Pending'
  },
  Processing: {
    color: 'text-[#FFCD19] border-[#FFCD19]',
    text: 'Processing'
  },
  'Return Initiated': {
    color: 'text-[#FFCD19] border-[#FFCD19]',
    text: 'Return Initiated'
  }
};

const OrderItem = ({
  orderItem,
  controls,
  className,
  infoContainerClassName,
  orderCreatedAt
}: OrderItemProps) => {
  return (
    <li className={`${className} shadow-md`}>
      <div className={`flex gap-x-5 items-center ${infoContainerClassName}`}>
        <div className='w-32 h-36 bg-[#F5F5F5] rounded-2xl grid place-content-center'>
          <img
            alt='Product'
            src={orderItem.images[0]}
            loading='lazy'
            className='w-24 h-28 object-cover'
          />
        </div>
        <div className='flex flex-col gap-y-1 leading-4'>
          <p className='font-semibold text-OuterSpace '>
            Delivered on:
            <span className='text-xs text-[#30B700]'>
              {' '}
              {new Date(
                new Date().setDate(new Date().getDate() + 5)
              ).toDateString()}
            </span>
          </p>
          <p className='text-Aluminium text-xs'>
            Order date: {new Date(orderCreatedAt * 1000).toDateString()}
          </p>
          <div className='flex flex-col font-semibold w-80 gap-1 overflow-hidden'>
            <h4 className='text-sm text-whiteSmoke'>{orderItem.vendorName}</h4>
            <h3 className='text-OuterSpace text-base truncate'>
              {orderItem.name}
            </h3>
            <p className='text-Aluminium font-medium text-xs'>Color: Grey</p>
            <p className='text-Aluminium font-medium text-xs'>
              Quantity: {orderItem.quantity}
            </p>
          </div>
          <div className='flex flex-col self-start justify-start lg:flex-row lg:items-center gap-2'>
            <p className='font-medium text-OuterSpace text-sm'>
              Shipping status:{' '}
            </p>
            <span
              className={`border rounded-lg py-1 min-w-[10rem] text-center font-semibold text-sm ${
                orderStatus[orderItem.status]?.color
              }`}
            >
              {orderStatus[orderItem.status]?.text}
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-4 mb-auto'>
        <div className='flex flex-col gap-y-1 text-Aluminium font-medium text-sm'>
          <h4 className='font-bold text-OuterSpace'>
            Total: {PRICE_CURRENCY} {orderItem.price}
          </h4>
          <p>Download Invoice</p>
        </div>
        {controls}
      </div>
    </li>
  );
};

export default OrderItem;
