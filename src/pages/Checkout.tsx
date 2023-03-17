import PaymentMethods from '@src/components/page-content/checkout/PaymentMethods';
import ReviewOrder from '@src/components/page-content/checkout/ReviewOrder';
import ShippingAddress from '@src/components/page-content/checkout/ShippingAddress';
import { checkIfDeliverable, placeOrder } from '@src/services/OrderService';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import { paymentMethodType } from '@src/types/API/OrderType';
import { useMutation } from '@tanstack/react-query';
import { Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '@src/configs/EnvironmentConfig';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '@src/components/forms/PaymentForm';
import { useAppSelector } from '@src/hooks/redux-hook';
import { API_BASE_URL } from '@src/configs/AppConfig';
import { EventSourcePolyfill } from 'event-source-polyfill';
import ConfirmPaymentModal from '@src/components/modals/ConfirmPaymentMosal';

const stripePromise = loadStripe(
  'pk_test_51MmFjiSE8oHisq8KJ4U750AqpJNgwd3ddYgkJNRFr3mATmZgw0TpSdDVIGEXIokKWiPGGdLq2C6hQ1z7g2D8xQbI00ZwOR9lzd'
);

let eventSourceStripe: EventSourcePolyfill;
let eventSourceOrderFailed: EventSourcePolyfill;
let eventSourceOrderConfirmed: EventSourcePolyfill;

const Checkout = () => {
  const { auth } = useAppSelector((state) => state.user);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    ModalComponent: ConfirmPaymentModalComponent,
    toggleModal: toggleConfirmPaymentModal
  } = ConfirmPaymentModal();

  const [selectedAddress, setSelectedAddress] =
    useState<CustomerAddressType | null>(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<paymentMethodType>('Cod');

  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(
    null
  );

  const { mutateAsync: checkIfAddressDeliverableMutation } = useMutation({
    mutationFn: async (data: Parameters<typeof checkIfDeliverable>[0]) =>
      checkIfDeliverable(data)
  });

  const { mutateAsync: requestOrderMutation } = useMutation({
    mutationFn: async (data: Parameters<typeof placeOrder>[0]) =>
      placeOrder(data)
  });

  useEffect(() => {
    if (
      !eventSourceStripe ||
      !eventSourceOrderFailed ||
      !eventSourceOrderConfirmed
    ) {
      return;
    }
    return () => {
      eventSourceStripe.close();
      eventSourceOrderFailed.close();
      eventSourceOrderConfirmed.close();
    };
  }, []);

  const onPaymentSuccess = () => {
    setIsModalVisible(false);
    toggleConfirmPaymentModal(true);
  };
  const onPaymentError = () => {
    setIsModalVisible(false);
    message.error('Payment failed');
    setTimeout(() => {
      message.destroy();
    }, 1000);
  };

  const onStartCheckoutEvents = () => {
    const RequestContent = {
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
        Connection: 'Keep-Alive',
        'Keep-Alive': { timeout: 6000, max: 1000 }
      },
      heartbeatTimeout: 600 * 1000
    } as any;
    eventSourceStripe = new EventSourcePolyfill(
      `${API_BASE_URL}events/order/Stripe_Payment_Created`,
      RequestContent
    );

    eventSourceOrderFailed = new EventSourcePolyfill(
      `${API_BASE_URL}events/order/Order_Failed`,
      RequestContent
    );

    eventSourceOrderConfirmed = new EventSourcePolyfill(
      `${API_BASE_URL}events/order/Order_Confirmed`,
      RequestContent
    );

    eventSourceStripe.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStripeClientSecret(data.stripeClientSecret);
      setIsModalVisible(true);
      setTimeout(() => {
        message.destroy();
      }, 1000);
      eventSourceStripe.close();
    };

    eventSourceStripe.onerror = (event) => {
      eventSourceStripe.close();
    };

    eventSourceOrderFailed.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, 'eventSourceOrderFailed => ERROR');
      onPaymentError();
      eventSourceOrderFailed.close();
    };

    eventSourceOrderFailed.onerror = (event) => {
      onPaymentError();
      eventSourceOrderFailed.close();
    };

    eventSourceOrderConfirmed.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, 'eventSourceOrderConfirmed');
      message.success('Order confirmed!');
      setTimeout(() => {
        message.destroy();
      }, 1000);
      onPaymentSuccess();
      eventSourceOrderConfirmed.close();
    };

    eventSourceOrderConfirmed.onerror = (event) => {
      onPaymentError();
      eventSourceOrderConfirmed.close();
    };
  };

  const onCheckoutHandler = async () => {
    if (!selectedPaymentMethod) {
      message.error('Please select a payment method');
      return;
    }

    if (!selectedAddress) {
      message.error('Please select a shipping address');
      return;
    }

    const { isDeliver } = await checkIfAddressDeliverableMutation({
      fromCart: true,
      shippingAddressId: selectedAddress?.id
    });

    if (!isDeliver) {
      message.error('This address is not deliverable');
      return;
    }

    message.loading('Placing the order', 0);

    try {
      const orderResponse = await requestOrderMutation({
        shippingAddressId: selectedAddress?.id,
        billingAddressId: selectedAddress?.id,
        paymentMethod: selectedPaymentMethod,
        fromCart: true,
        useWalletBalance: false
      });

      if (!orderResponse.orderAccepted) {
        message.error('Order not accepted');
        setTimeout(() => {
          message.destroy();
        }, 1000);
        return;
      }
      onStartCheckoutEvents();
    } catch (err) {
      message.error('Something went wrong while placing the order');
      setTimeout(() => {
        message.destroy();
      }, 1000);
      return;
    }
  };

  return (
    <section
      className={`w-11/12 flex flex-col-reverse gap-10 md:flex-row mt-16 mb-40`}
    >
      <div className='w-full md:w-3/4 md:max-w-4xl flex flex-col gap-y-9'>
        <ShippingAddress
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <PaymentMethods setSelectedPaymentMethod={setSelectedPaymentMethod} />
      </div>
      <ReviewOrder
        selectedPaymentMethod={selectedPaymentMethod}
        onCheckoutHandler={onCheckoutHandler}
      />
      {stripeClientSecret && selectedAddress && (
        <Elements
          stripe={stripePromise}
          options={{
            appearance: {
              theme: 'stripe'
            },
            clientSecret: stripeClientSecret
          }}
        >
          <Modal
            className='!w-[45rem]'
            centered={true}
            open={isModalVisible}
            onCancel={() => {
              setIsModalVisible(false);
            }}
            footer={null}
          >
            <PaymentForm
              address={selectedAddress}
              onPaymentSuccess={onPaymentSuccess}
              onPaymentFailed={onPaymentError}
            />
          </Modal>
        </Elements>
      )}
      <ConfirmPaymentModalComponent />
    </section>
  );
};

export default Checkout;
