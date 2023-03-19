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
    <div className='bg-white rounded-2xl p-6 flex gap-x-3 items-baseline justify-center w-[23.625rem] h-64'>
      <AddressSvg className='w-4 h-4' />
      <div className='flex flex-col gap-y-3'>
        <h2 className='font-semibold text-xl text-OuterSpace'>
          {isPrimary
            ? 'Primary Shipping Address'
            : `Shipping Address ${addressIndex}`}
        </h2>
        <h3 className='text-lg text-OuterSpace font-bold'>
          {address.name} <br />
          <span className='text-[#818589] font-medium'>
            {address.line1} <br />
            {address.city} - {address.state}
          </span>{' '}
          <br />
          <p className='text-[#818589] text-lg font-medium'>
            Phone number: {address.phone}
          </p>
        </h3>

        <div className='flex items-center gap-x-10'>
          {!isPrimary && (
            <button
              onClick={() => onSetAsPrimaryBtnHandler?.(address)}
              className='text-turkishRose text-lg font-semibold hover:opacity-80'
              type='button'
            >
              Set Primary
            </button>
          )}
          <button
            onClick={() => onEditBtnHandler(address)}
            className='text-turkishRose text-lg font-semibold hover:opacity-80'
            type='button'
          >
            Edit
          </button>
          <button
            className='text-turkishRose text-lg font-semibold hover:opacity-80'
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
