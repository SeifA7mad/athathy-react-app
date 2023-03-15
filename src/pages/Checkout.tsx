import PaymentMethods from '@src/components/page-content/checkout/PaymentMethods';
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
      className={`w-11/12 flex flex-col md:flex-row justify-between mt-16`}
    >
      <div className='w-3/4 flex flex-col gap-y-9'>
        <ShippingAddress
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <PaymentMethods setSelectedPaymentMethod={setSelectedPaymentMethod} />
      </div>
    </section>
  );
};

export default Checkout;
