import { OrderDetailsType, OrderItemType } from '@src/types/API/OrdersType';
import OrderItemsList from './OrderItemsList';
import AddressSvg from '@src/assets/svg/AddressMenuSvg';
import { Divider } from 'antd';

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
      <div className='flex flex-col items-center gap-10 lg:flex-row'>
        <OrderItemsList
          orderCreatedAt={props.order.createdAt}
          orderItems={props.order.items}
          onCancelHandler={props.onCancelHandler}
          onOrderAgainHandler={props.onOrderAgainHandler}
          onReturnHandler={props.onReturnHandler}
          onTrackHandler={props.onTrackHandler}
        />
        <div className='flex flex-col w-full rounded-[20px] p-5 gap-4 bg-white lg:w-96 shadow-md'>
          <div className='flex flex-col'>
            <h2 className='font-semibold text-lg self-center text-turkishRose'>
              Order No.: {props.order.orderNo}
            </h2>
            <div className='flex gap-2'>
              <AddressSvg className='text-black mt-2' />
              <div className='flex flex-col gap-1'>
                <span className='font-bold text-sm'>
                  {props.order.userName}
                </span>
                <p className='text-xs text-[#92929D]'>
                  {props.order.shippingAddress.addressLine1},{' '}
                  {props.order.shippingAddress.city},{' '}
                  {props.order.shippingAddress.country},{' '}
                  {props.order.shippingAddress.stateOrRegion}
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <h2 className='font-bold text-base'>Bill Details</h2>
            <Divider dashed className='border-turkishRose my-2' />
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <span className='text-sm font-semibold'>Subtotal</span>
                <span className='text-sm font-semibold'>
                  AED {props.order.totalAmount}
                </span>
              </div>
              <div className='flex justify-between text-xs text-whiteSmoke font-medium'>
                <span className='flex items-center gap-2'>
                  Voucher{' '}
                  <span className='px-2 py-0.5 text-[#30B700] border-dotted border border-[#30B700] rounded-lg'>
                    Shopee123
                  </span>
                </span>
                <span className='text-[#30B700]'>
                  -AED {props.order.totalAmount}
                </span>
              </div>
              <div className='flex justify-between text-xs text-whiteSmoke font-medium'>
                <span>Shipping</span>
                <span>
                  {props.order.shippingCharge === 0
                    ? 'FREE'
                    : props.order.shippingCharge}
                </span>
              </div>
              <div className='flex justify-between text-xs text-whiteSmoke font-medium'>
                <span>Payment Method</span>
                <span>{props.order.payment.type}</span>
              </div>
              <Divider className='border-turkishRose my-0' />
              <div className='flex justify-between'>
                <span className='text-sm font-semibold'>Total</span>
                <span className='text-sm font-semibold'>
                  AED {props.order.totalAmount}
                </span>
              </div>
              <Divider className='border-turkishRose my-0' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
