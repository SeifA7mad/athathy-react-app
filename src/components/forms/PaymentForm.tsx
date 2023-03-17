import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement
} from '@stripe/react-stripe-js';
import { message } from 'antd';
import { useState } from 'react';

interface PaymentFormProps {
  onPaymentSuccess: () => void;
  onPaymentFailed: () => void;
  address: CustomerAddressType;
}

const PaymentForm = ({
  onPaymentFailed,
  onPaymentSuccess,
  address
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setPaymentLoading(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: 'if_required',
      confirmParams: {}
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error);
      onPaymentFailed();
    } else {
      onPaymentSuccess();
    }

    setPaymentLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-10 pt-5'>
      <div className='flex flex-col gap-y-5'>
        <div className='flex flex-col gap-y-5'>
          <h3 className='font-bold text-firebrick text-xl'>Contact info</h3>
          <AddressElement
            options={{
              mode: 'shipping',
              display: {
                name: 'split'
              },
              fields: {
                phone: 'never'
              },
              defaultValues: {
                firstName: address.name,
                lastName: address.lastName,
                address: {
                  line1: address.line1,
                  line2: address.line2,
                  country: address.country,
                  city: address.city,
                  state: address.state
                }
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-y-5'>
          <h3 className='font-bold text-firebrick text-xl'>Payment</h3>
          <PaymentElement
            options={{
              business: {
                name: 'Athathy'
              },
              layout: 'accordion'
            }}
          />
        </div>
      </div>
      <button
        type='submit'
        className='text-white rounded-lg font-semibold bg-turkishRose w-full h-14 flex items-center justify-center hover:opacity-75'
      >
        {!paymentLoading ? 'Place Order' : 'Processing...'}
      </button>
    </form>
  );
};

export default PaymentForm;
