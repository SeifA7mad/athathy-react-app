import MasterCardSvg from '@src/assets/svg/MasterCardSvg';
import VisaCardSvg from '@src/assets/svg/VisaCardSvg';
import { paymentMethodType } from '@src/types/API/OrderType';
import { Radio } from 'antd';

interface PaymentMethodsProps {
  setSelectedPaymentMethod: (args: paymentMethodType) => void;
}

const paymentMethods: paymentMethodType[] = ['Online', 'Cod'];

const paymentMethodsMapper = {
  Cod: 'Cash on Delivery',
  Online: 'Debit/Credit Card'
} satisfies Record<paymentMethodType, string>;

const PaymentMethods = ({ setSelectedPaymentMethod }: PaymentMethodsProps) => {
  return (
    <div className='flex flex-col gap-y-6 w-full max-w-3xl'>
      <h1 className='font-bold text-2xl text-gray40'>Payment</h1>
      <div className='bg-white w-full max-w-[50rem] rounded-2xl py-7 px-9 flex items-baseline gap-x-5 relative'>
        <Radio.Group
          className='text-2xl'
          defaultValue={paymentMethods[0]}
          onChange={(event) => setSelectedPaymentMethod(event.target.value)}
        >
          <div className='flex flex-col gap-y-8'>
            {paymentMethods.map((paymentMethod) => (
              <Radio
                key={paymentMethod}
                className='text-lg text-gray40 font-medium'
                value={paymentMethod}
              >
                {paymentMethodsMapper[paymentMethod]}
              </Radio>
            ))}
          </div>
        </Radio.Group>

        <div className='flex gap-x-6 absolute right-7 top-7'>
          <VisaCardSvg className='w-8 h-8' />
          <MasterCardSvg className='w-8 h-8' />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
