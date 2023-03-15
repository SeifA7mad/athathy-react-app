import PaymentMethods from '@src/components/page-content/checkout/PaymentMethods';
import ReviewOrder from '@src/components/page-content/checkout/ReviewOrder';
import ShippingAddress from '@src/components/page-content/checkout/ShippingAddress';
import { CustomerAddressType } from '@src/types/API/CustomerType';
import { useState } from 'react';

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] =
    useState<CustomerAddressType | null>(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

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
      <ReviewOrder />
    </section>
  );
};

export default Checkout;
