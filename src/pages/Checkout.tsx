import PaymentMethods from '@src/components/page-content/checkout/PaymentMethods';
import ReviewOrder from '@src/components/page-content/checkout/ReviewOrder';
import ShippingAddress from '@src/components/page-content/checkout/ShippingAddress';
import { checkIfDeliverable, placeOrder } from '@src/services/OrderService';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import { paymentMethodType } from '@src/types/API/OrderType';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useState } from 'react';

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] =
    useState<CustomerAddressType | null>(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<paymentMethodType>('Cod');

  const { mutateAsync: checkIfAddressDeliverableMutation } = useMutation({
    mutationFn: async (data: Parameters<typeof checkIfDeliverable>[0]) =>
      checkIfDeliverable(data)
  });

  const { mutateAsync: requestOrderMutation } = useMutation({
    mutationFn: async (data: Parameters<typeof placeOrder>[0]) =>
      placeOrder(data)
  });

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

    // if (!isDeliver) {
    //   message.error('This address is not deliverable');
    //   return;
    // }

    message.loading('Placing the order', 0);

    try {
      const { orderAccepted } = await requestOrderMutation({
        shippingAddressId: selectedAddress?.id,
        billingAddressId: selectedAddress?.id,
        paymentMethod: selectedPaymentMethod,
        fromCart: true,
        useWalletBalance: false
      });

      if (!orderAccepted) {
        message.error('Order not accepted');
        setTimeout(() => {
          message.destroy();
        }, 1000);
        return;
      }
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
      <ReviewOrder onCheckoutHandler={onCheckoutHandler} />
    </section>
  );
};

export default Checkout;
