import { paymentMethodType } from '@src/types/API/OrderType';
import { Radio } from 'antd';

interface PaymentMethodsProps {
  setSelectedPaymentMethod: (args: paymentMethodType) => void;
}

const paymentMethods: paymentMethodType[] = ['Cod', 'Online'];

const paymentMethodsMapper = {
  Cod: 'Cash on Delivery',
  Free: 'Free',
  Online: 'Debit/Credit Card',
  PaymentLink: 'Payment Link'
} satisfies Record<paymentMethodType, string>;

const PaymentMethods = ({ setSelectedPaymentMethod }: PaymentMethodsProps) => {
  return (
    <div className='flex flex-col gap-y-6 w-full max-w-3xl'>
      <h1 className='font-bold text-2xl text-gray40'>Payment</h1>
      <div className='bg-white w-full max-w-[50rem] rounded-2xl py-7 px-9 flex items-baseline gap-x-5'>
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
      </div>
    </div>
  );
};

export default PaymentMethods;
