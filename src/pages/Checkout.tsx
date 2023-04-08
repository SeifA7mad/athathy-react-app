import PaymentMethods from '@src/components/page-content/checkout/PaymentMethods';
import ReviewOrder from '@src/components/page-content/checkout/ReviewOrder';
import ShippingAddress from '@src/components/page-content/checkout/ShippingAddress';
import { checkIfDeliverable, placeOrder } from '@src/services/OrdersService';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import { paymentMethodType } from '@src/types/API/OrderType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Modal, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '@src/components/forms/PaymentForm';
import { useAppSelector } from '@src/hooks/redux-hook';
import {
  API_BASE_URL,
  APP_PREFIX_PATH,
  UNAUTHENTICATED_ENTRY
} from '@src/configs/AppConfig';
import { EventSourcePolyfill } from 'event-source-polyfill';
import ConfirmPaymentModal from '@src/components/modals/ConfirmPaymentMosal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';

const stripePromise = loadStripe(
  'pk_test_51MmFjiSE8oHisq8KJ4U750AqpJNgwd3ddYgkJNRFr3mATmZgw0TpSdDVIGEXIokKWiPGGdLq2C6hQ1z7g2D8xQbI00ZwOR9lzd'
);

let eventSourceStripe: EventSourcePolyfill;
let eventSourceOrderFailed: EventSourcePolyfill;
let eventSourceOrderConfirmed: EventSourcePolyfill;

const Checkout = () => {
  const { auth } = useAppSelector((state) => state.user);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const discount = searchParams.get('discount') || 0;
  const coupon = searchParams.get('coupon') || undefined;

  const navigate = useNavigate();

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

    eventSourceStripe.onerror = (event: any) => {
      if (event?.status === 401) {
        navigate(`${APP_PREFIX_PATH}/undefined/${UNAUTHENTICATED_ENTRY}`);
        return;
      }
      onPaymentError();
      eventSourceStripe.close();
    };

    eventSourceOrderFailed.onerror = (event) => {
      onPaymentError();
      eventSourceOrderFailed.close();
    };

    eventSourceOrderConfirmed.onerror = (event) => {
      onPaymentError();
      eventSourceOrderConfirmed.close();
    };

    eventSourceStripe.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStripeClientSecret(data.stripeClientSecret);
      setIsModalVisible(true);
      message.destroy();
      eventSourceStripe.close();
    };

    eventSourceOrderFailed.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, 'eventSourceOrderFailed => ERROR');
      onPaymentError();
      eventSourceOrderFailed.close();
    };

    eventSourceOrderConfirmed.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, 'eventSourceOrderConfirmed');
      notification.success({
        message: 'Order Confirmed'
      });
      onPaymentSuccess();
      eventSourceOrderConfirmed.close();
    };
    return () => {
      eventSourceStripe.close();
      eventSourceOrderFailed.close();
      eventSourceOrderConfirmed.close();
    };
  }, []);

  const onPaymentSuccess = () => {
    setIsModalVisible(false);
    toggleConfirmPaymentModal(true);
    message.destroy();
  };
  const onPaymentError = (errMessage?: string) => {
    setIsModalVisible(false);
    setIsSubmitting(false);
    message.destroy();
    navigate(`${APP_PREFIX_PATH}/${RouteKeysEnum.cart}`);
    // notification.error({
    //   message: errMessage || 'Payment Failed'
    // });
  };

  const onCheckoutHandler = async () => {
    setIsSubmitting(true);
    if (!selectedPaymentMethod) {
      notification.error({
        message: 'Please select a payment method'
      });
      return;
    }

    if (!selectedAddress) {
      notification.error({
        message: 'Please select a shipping address'
      });
      setIsSubmitting(false);
      return;
    }

    const { isDeliver } = await checkIfAddressDeliverableMutation({
      fromCart: true,
      shippingAddressId: selectedAddress?.id
    });

    if (!isDeliver) {
      notification.error({
        message: 'Sorry, we do not deliver to this address'
      });
      setIsSubmitting(false);
      return;
    }

    message.loading('Placing the order', 0);

    try {
      const orderResponse = await requestOrderMutation({
        shippingAddressId: selectedAddress?.id,
        billingAddressId: selectedAddress?.id,
        paymentMethod: selectedPaymentMethod,
        fromCart: true,
        couponCode: coupon,
        useWalletBalance: false
      });

      if (!orderResponse.orderAccepted) {
        notification.error({
          message: 'Order not accepted'
        });
        message.destroy();
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      notification.error({
        message: 'Something went wrong while placing the order'
      });
      message.destroy();
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
        discount={+discount}
        isSubmitting={isSubmitting}
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
