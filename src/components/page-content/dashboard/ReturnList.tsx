import EmptyItem from '@src/components/shared/EmptyItem';
import { PRICE_CURRENCY } from '@src/configs/AppConfig';
import { OrderItemType } from '@src/types/API/OrdersType';

import EmptyImage from '@src/assets/images/banners/no-returns.png';

const orderStatus: Record<string, { color: string; text: string }> = {
  'Picked up': {
    color: 'text-[#686B6F] border-[#686B6F]',
    text: 'Picked up'
  },
  Cancelled: {
    color: 'text-[#D72121] border-[#D72121]',
    text: 'Cancelled'
  },
  'Return Requested': {
    color: 'text-[#FFCD19] border-[#FFCD19]',
    text: 'Return Requested'
  }
};

interface ReturnListProps {
  orders: OrderItemType[];
}

const ReturnList = ({ orders }: ReturnListProps) => {
  const renderOrders = () => {
    if (!orders?.length)
      return (
        <EmptyItem
          image={EmptyImage}
          title='You have no recent returns'
          description={`Looks like you haven't anything in the past few months.`}
        />
      );
    return orders.map((order) => (
      <li
        className={`bg-white md:h-48 w-full rounded-3xl p-5 flex flex-col gap-y-4 md:flex-row md:items-center justify-between xl:justify-start`}
      >
        <div className='flex gap-x-5'>
          <div className='w-32 h-36 bg-[#F5F5F5] rounded-2xl grid place-content-center'>
            <img
              alt='Product'
              src={order.images[0]}
              loading='lazy'
              className='w-24 h-28 object-contain'
            />
          </div>
          <div className='flex flex-col gap-y-1 leading-4 font-semibold'>
            <h3 className='text-lg text-turkishRose '>
              Order No: {order.orderNo}
            </h3>
            <h4 className='text-sm text-whiteSmoke'>{order.vendorName}</h4>
            <h3 className='text-OuterSpace'>{order.name}</h3>
            <p className='text-Aluminium font-medium text-xs'>Color: Grey</p>
            <h4 className='text-sm text-whiteSmoke'>
              Total: {PRICE_CURRENCY}
              {order.price}
            </h4>
            <p className='text-Aluminium font-medium text-sm'>
              {'Return initiated: 12th January 2023'}
            </p>
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
      </li>
    ));
  };
  return (
    <ul className='w-11/12 flex flex-col max-w-7xl gap-y-5'>
      {renderOrders()}
    </ul>
  );
};

export default ReturnList;
