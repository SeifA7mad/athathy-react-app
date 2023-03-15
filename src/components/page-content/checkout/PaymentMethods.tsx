import { Radio } from 'antd';

interface PaymentMethodsProps {
  setSelectedPaymentMethod: (args: string | null) => void;
}

const PaymentMethods = ({ setSelectedPaymentMethod }: PaymentMethodsProps) => {
  return (
    <div className='flex flex-col gap-y-6 w-full max-w-3xl'>
      <h1 className='font-bold text-2xl text-gray40'>Payment</h1>
      <div className='bg-white w-full max-w-[50rem] rounded-2xl py-7 px-9 flex items-baseline gap-x-5'>
        <Radio.Group
          className='text-2xl'
          onChange={(event) => setSelectedPaymentMethod(event.target.value)}
        >
          <div className='flex flex-col gap-y-8'>
            <Radio
              className='text-lg text-gray40 font-medium'
              value={'Cash on Delivery'}
            >
              Cash on Delivery
            </Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};

export default PaymentMethods;
