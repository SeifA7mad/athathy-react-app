import ExtensiveSupportSvg from '@src/assets/svg/ExtensiveSupportSvg';
import OverviewSvg from '@src/assets/svg/OverviewSvg';
import VendorPortalForm from '@src/components/forms/VendorPortalForm';

import increasedSalesImg from '@src/assets/images/vendor-portal/increased-sales.png';
import marketingSupportImg from '@src/assets/images/vendor-portal/marketing-support.png';
import hassleFreeSellingImg from '@src/assets/images/vendor-portal/hassle-free-selling.png';

export default function VendorPortal() {
  return (
    <>
      <div
        className={`flex flex-col gap-10 py-8 w-full bg-[url('/vendor-portal-bg.png')] bg-cover bg-center bg-no-repeat]`}
      >
        <div className='flex items-center justify-between px-24'>
          <h1 className='text-[#F5F5F5] font-bold text-2xl'>ATHATHY</h1>
          <button className='border-[3px] bg-white/20 px-6 py-2 border-turkishRose rounded-[2.625rem] text-white'>
            Vendor's Portal
          </button>
        </div>
        <div className='flex items-center justify-between gap-16 px-24 2xl:justify-center 2xl:gap-32'>
          <section className='flex flex-col gap-5 w-[40.8125rem]'>
            <h2 className='text-[#ECEAE9] font-extrabold text-[3.75rem]'>
              Join Our Platform as a Furniture Vendor and Showcase Your
              Products.
            </h2>
            <p className='text-[#F5F5F5] font-semibold text-2xl'>
              Expand your reach, connect with customers, grow your business and
              sell your products online. Become a vendor on our furniture
              ecommerce platform and boost your sales!
            </p>
          </section>
          <VendorPortalForm />
        </div>
      </div>

      <div className='flex flex-col py-[8.8125rem] gap-[9.9375rem]'>
        <OurServices />
        <BenefitsJoiningOurComm />
        <section className='flex flex-col gap-[2.9375rem] items-center justify-center w-full'>
          <h2 className='font-bold text-3xl text-[#212121]'>
            Ready to join us?
          </h2>
          <button className='bg-turkishRose rounded-[.625rem] py-[1.4375rem] w-1/3 text-[#F5F5F5] font-extrabold text-xl'>
            Join now
          </button>
        </section>
      </div>
    </>
  );
}

function OurServices() {
  return (
    <section className='flex flex-col gap-[2.9375rem]'>
      <h2 className='text-center text-[#212121] font-bold text-[2.25rem]'>
        Our Services
      </h2>
      <div className='flex gap-[2.5rem]'>
        <div className='flex justify-center gap-4 px-[3rem] py-[3.375rem] bg-white max-w-[34.625rem] rounded-[1.25rem] shadow-[0px_12px_26px_rgba(0,0,0,0.1)]'>
          <span className='flex items-center justify-center bg-white rounded-full aspect-square h-12 shadow-[0px_12px_26px_rgba(0,0,0,0.1)]'>
            <OverviewSvg />
          </span>
          <div>
            <h4 className='font-semibold text-[#212121] text-base'>Overview</h4>
            <p className='font-light text-base text-black'>
              Athathy is not just about providing a prominent shopping
              experience for customers. We also offer a range of services to our
              partnered brands, helping them reach their full potential and
              connecting them with customers in a holistic manner.
            </p>
          </div>
        </div>
        <div className='flex justify-center gap-4 px-[3rem] py-[3.375rem] bg-white max-w-[34.625rem] rounded-[1.25rem] shadow-[0px_12px_26px_rgba(0,0,0,0.1)]'>
          <span className='flex items-center justify-center bg-white rounded-full aspect-square h-12 shadow-[0px_12px_26px_rgba(0,0,0,0.1)]'>
            <ExtensiveSupportSvg />
          </span>
          <div>
            <h4 className='font-semibold text-[#212121] text-base'>
              Extensive support
            </h4>
            <p className='font-light text-base text-black'>
              Our partnered brands benefit from increased exposure to a larger
              customer base, product management and logistics support, marketing
              and promotional opportunities, and access to valuable data and
              insights about customer interactions with their very own products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsJoiningOurComm() {
  return (
    <section className='flex flex-col gap-[2.9375rem]'>
      <h2 className='text-center text-[#212121] font-bold text-[2.25rem]'>
        Benefits of joining our community
      </h2>
      <div className='flex gap-[2.5rem]'>
        {/* Card 1 */}
        <div className='flex flex-col items-center justify-center gap-[1.625rem] py-[2.75rem] px-[1.25rem] w-[23.375rem] bg-white rounded-[1.4375rem] shadow-[0px_12px_26px_rgba(0,0,0,0.1)]'>
          <img
            src={increasedSalesImg}
            className='object-contain w-[15.625rem]'
          />
          <div className='flex flex-col items-center justify-center gap-[.8125rem]'>
            <h4 className='font-semibold text-xl'>Increased Sales</h4>
            <p className='font-light text-base'>
              By joining our ecommerce platform as a vendor, you'll be able to
              tap into our existing customer base and reach a wider audience.
              This can help you generate more sales for your furniture products
              and grow your business.
            </p>
          </div>
        </div>
        {/* Card 2 */}
        <div className='flex flex-col items-center justify-center gap-[1.625rem] py-[2.75rem] px-[1.25rem] w-[23.375rem] bg-white rounded-[1.4375rem] shadow-[0px_12px_26px_rgba(0,0,0,0.1)]'>
          <img
            src={marketingSupportImg}
            className='object-contain w-[13.5rem]'
          />
          <div className='flex flex-col items-center justify-center gap-[.8125rem]'>
            <h4 className='font-semibold text-xl'>Marketing Support</h4>
            <p className='font-light text-base'>
              We offer marketing support to our vendors, which includes
              promoting their products through our social media channels, email
              newsletters, and other marketing channels. This can help increase
              visibility and drive traffic to your online store.
            </p>
          </div>
        </div>
        {/* Card 3 */}
        <div className='flex flex-col items-center justify-center gap-[1.625rem] py-[2.75rem] px-[1.25rem] w-[23.375rem] bg-white rounded-[1.4375rem] shadow-[0px_12px_26px_rgba(0,0,0,0.1)]'>
          <img
            src={hassleFreeSellingImg}
            className='object-contain w-[15.25rem]'
          />
          <div className='flex flex-col items-center justify-center gap-[.8125rem]'>
            <h4 className='font-semibold text-xl'>Hassle-Free Selling</h4>
            <p className='font-light text-base'>
              Our ecommerce platform takes care of all the technical aspects of
              selling online, including payment processing and order
              fulfillment. This means you can focus on what you do best -
              designing and creating beautiful furniture - while we take care of
              the rest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
