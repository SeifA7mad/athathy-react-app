import AddressSvg from '@src/assets/svg/AddressSvg';
import { CustomerAddressType } from '@src/types/API/CustomerType';

interface AddressCardProps {
  address: CustomerAddressType;
  onEditBtnHandler: (address: CustomerAddressType) => void;
  onDeleteBtnHandler: (id: string) => void;
  onSetAsPrimaryBtnHandler?: (address: CustomerAddressType) => void;
  isPrimary: boolean;
  addressIndex?: number;
}

const AddressCard = ({
  address,
  onDeleteBtnHandler,
  onEditBtnHandler,
  onSetAsPrimaryBtnHandler,
  isPrimary,
  addressIndex
}: AddressCardProps) => {
  return (
    <div className='bg-white rounded-2xl py-[1.25rem] flex gap-x-3 items-baseline justify-center w-[21.375rem] h-[12.1875rem] shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'>
      <AddressSvg className='w-5 h-5 top-0.5 relative' />
      <div className='flex flex-col gap-y-[.625rem]'>
        <h2 className='font-semibold text-lg text-OuterSpace leading-[1.125rem]'>
          {isPrimary
            ? 'Primary Shipping Address'
            : `Shipping Address ${addressIndex}`}
        </h2>
        <h3 className='text-base text-OuterSpace font-bold leading-[1.375rem]'>
          {address.name} <br />
          <span className='text-[#818589] text-sm font-medium leading-[1.375rem]'>
            {address.line1} <br />
            {address.city} - {address.country}
          </span>
          <br />
          <p className='text-[#818589] text-sm font-medium mt-2 leading-[1.125rem]'>
            <span className='text-OuterSpace'>Phone number:</span>{' '}
            {address.phone}
          </p>
        </h3>

        <div className='flex items-center gap-x-[1.875rem]'>
          {!isPrimary && (
            <button
              onClick={() => onSetAsPrimaryBtnHandler?.(address)}
              className='text-turkishRose text-base font-semibold hover:opacity-80 leading-[1.125rem]'
              type='button'
            >
              Set Primary
            </button>
          )}
          <button
            onClick={() => onEditBtnHandler(address)}
            className='text-turkishRose text-base font-semibold hover:opacity-80 leading-[1.125rem]'
            type='button'
          >
            Edit
          </button>
          <button
            className='text-turkishRose text-base font-semibold hover:opacity-80 leading-[1.125rem]'
            type='button'
            onClick={() => onDeleteBtnHandler(address.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
