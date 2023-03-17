import { PRICE_CURRENCY } from '@src/configs/AppConfig';
import { OrderItemType } from '@src/types/API/OrdersType';

interface OrderItemProps {
  order: OrderItemType;
  controls?: JSX.Element;
  className?: string;
}

const orderStatus: Record<string, { color: string; text: string }> = {
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
  }
};

const OrderItem = ({ order, controls, className }: OrderItemProps) => {
  return (
    <li className={`${className}`}>
      <div className='flex gap-x-5 xl:w-1/2 items-center'>
        <div className='w-32 h-36 bg-[#F5F5F5] rounded-2xl grid place-content-center'>
          <img
            alt='Product'
            src={order.images[0]}
            loading='lazy'
            className='w-24 h-28 object-cover'
          />
        </div>
        <div className='flex flex-col gap-y-1 leading-4'>
          <p className='font-semibold text-OuterSpace '>
            Delivered on
            <br />
            <span className='text-xs text-[#30B700]'>2nd February 2023</span>
          </p>
          <div className='flex flex-col font-semibold'>
            <h3 className='text-lg text-turkishRose '>
              Order No: {order.orderNo}
            </h3>
            <h4 className='text-sm text-whiteSmoke'>{order.vendorName}</h4>
            <h3 className='text-OuterSpace'>{order.name}</h3>
            <p className='text-Aluminium font-medium text-xs'>Color: Grey</p>
          </div>
          <div className='flex items-center gap-x-2'>
            <p className='font-medium text-OuterSpace'>Shipping status: </p>
            <span
              className={`border rounded-lg py-3 px-8 font-semibold ${
                orderStatus[order.status]?.color
              }`}
            >
              {orderStatus[order.status]?.text}
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-4 mb-auto'>
        <div className='flex flex-col gap-y-1 text-Aluminium font-medium text-sm'>
          <p>Order date: {new Date(order.orderedAt).toDateString()}</p>
          <h4 className='font-bold text-OuterSpace'>
            Total: {PRICE_CURRENCY} {order.price}
          </h4>
          <p>Download Invoice</p>
        </div>
        {controls}
      </div>
    </li>
  );
};

export default OrderItem;
