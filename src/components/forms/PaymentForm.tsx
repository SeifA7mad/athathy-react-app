import { API_BASE_URL } from '@src/configs/AppConfig';
import {
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';
import { message } from 'antd';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${API_BASE_URL}/`
      }
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error);
      message.error('Payment failed!');
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-y-20 pt-10'>
      <PaymentElement
        options={{
          business: {
            name: 'Athathy'
          },
          layout: 'accordion'
        }}
      />
      <button
        type='submit'
        className='text-white rounded-lg font-semibold bg-turkishRose w-full h-14 flex items-center justify-center hover:opacity-75'
      >
        Place Order
      </button>
    </form>
  );
};

export default PaymentForm;
