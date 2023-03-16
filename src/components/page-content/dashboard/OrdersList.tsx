import EmptyItem from '@src/components/shared/EmptyItem';
import { APP_PREFIX_PATH, PRICE_CURRENCY } from '@src/configs/AppConfig';
import { OrderItemType } from '@src/types/API/OrdersType';
import { useNavigate } from 'react-router-dom';

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
  }
};

interface OrdersListProps {
  orders: OrderItemType[];
  onOrderAgainHandler?: (id: string) => void;
  onReturnHandler?: (id: string) => void;
  onTrackHandler?: (id: string) => void;
  onCancelHandler?: (id: string) => void;
}

const OrdersList = ({ orders }: OrdersListProps) => {
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
    return orders.map((order) => (
      <li
        className={`bg-white md:h-48 w-full rounded-3xl p-5 flex flex-col gap-y-4 md:flex-row md:items-center justify-between xl:justify-start`}
      >
        <div className='flex gap-x-5 xl:w-1/2'>
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
        <div className='flex flex-col gap-y-4'>
          <div className='flex flex-col gap-y-1 text-Aluminium font-medium text-sm'>
            <p>Order date: {new Date(order.orderedAt).toLocaleDateString()}</p>
            <h4 className='font-bold text-OuterSpace'>
              Total: {PRICE_CURRENCY} {order.price}
            </h4>
            <p>Download Invoice</p>
          </div>
          <div className='flex flex-col gap-y-1 font-medium'>
            <button
              type='button'
              className='text-white bg-turkishRose py-1 rounded-lg'
            >
              Order again
            </button>
            <button
              type='button'
              className='text-turkishRose bg-transparent py-1 rounded-lg border border-turkishRose'
            >
              Return furniture
            </button>
          </div>
        </div>
      </li>
    ));
  };
  return (
    <ul className='w-11/12 flex flex-col max-w-7xl gap-y-5'>
      {renderOrders()}
    </ul>
  );
};

export default OrdersList;
