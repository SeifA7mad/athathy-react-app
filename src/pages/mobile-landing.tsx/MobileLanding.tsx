import playstore from 'src/assets/images/playStore.png';
import appStore from 'src/assets/images/appStore.png';
import img1 from 'src/assets/images/mobile-landing/1.png';
import img2 from 'src/assets/images/mobile-landing/2.png';
import img3 from 'src/assets/images/mobile-landing/3.png';

import './index.css';
import { useRef, useState } from 'react';
import LeftArrowCompleteSvg from '@src/assets/svg/LeftArrowCompleteSvg';
import RightArrowCompleteSvg from '@src/assets/svg/RightArrowCompleteSvg';
import Cart2Svg from '@src/assets/svg/Cart2Svg';
import OverviewSvg from '@src/assets/svg/OverviewSvg';
import ExtensiveSupportSvg from '@src/assets/svg/ExtensiveSupportSvg';
import HamburgerMenuIconSvg from '@src/assets/svg/HamburgerMenuIconSvg';

export default function MobileLanding() {
  return (
    <>
      <header
        className={`flex flex-col gap-10 py-[1.75rem] px-[1.1875rem] bg-[url('/img/mobile-landing-bg.jpg')] bg-cover bg-center bg-no-repeat`}
      >
        <div className='flex justify-between'>
          <h1 className='text-white font-semibold text-base'>ATHATHY</h1>
          <HamburgerMenuIconSvg />
        </div>
        <div className='flex flex-col gap-[43px] py-[102px]'>
          <h1 className='font-extrabold text-[40px] text-[#F5F5F5] leading-[50px] drop-shadow-md'>
            Fantastically beautiful furniture waiting to be discovered by you.
          </h1>
          <span className='pb-[10px] pr-16 w-fit border-b border-white text-base font-bold text-white'>
            Download the app now!
          </span>
          <div className='flex justify-between items-center'>
            <img src={playstore} loading='lazy' />
            <img src={appStore} loading='lazy' />
          </div>
        </div>
      </header>

      <main className='flex flex-col gap-[86px] bg-[#F5F5F5] py-[4rem]'>
        <div className='flex flex-col gap-[30px] px-[1.5rem] text-base leading-[24px]'>
          <p>
            Romantic, rustic, minimalist, classic, or modern - the world of
            furniture at Athathy is as diverse as the product ranges of renowned
            manufacturers around the world.
          </p>
          <p>
            With Athathy you have the unique opportunity to express your own
            personal taste and make your home an oasis of well-being. Innovative
            designs, high-quality materials, unique living concepts, and
            extraordinary furniture - experience it all online with Athathy.
          </p>
          <p>
            With us, you can find furniture conveniently online – around the
            clock and at fair prices.
          </p>

          <button className='bg-[#212121] self-start text-white font-semibold text-base rounded-[33px] py-[19px] px-[54.5008px]'>
            Get the app
          </button>
        </div>
        <AboutUsSection />
        <OurServicesSection />
        <OurServicesForCustomersSection />
        <OurServicesForPartneredBrandsSection />
        <FuturePlansAtAthathySection />
      </main>
    </>
  );
}

function AboutUsSection() {
  return (
    <div className='flex flex-col mx-[1.5rem] gap-[26px] py-[32px] px-[23.5008px] bg-white rounded-[16px]'>
      <div className='flex flex-col gap-[12px]'>
        <h2 className='text-[#CDB6B2] text-sm font-extrabold'>/ ABOUT US</h2>
        <h3 className='text-[#212121] font-extrabold text-2xl leading-9'>
          Your one-stop online furniture destination in Dubai.
        </h3>
      </div>
      <img src={img1} />
      <p className='text-OuterSpace leading-[24px] text-base'>
        Serving to both customers and furniture brands around the U.A.E, our
        mission is to make furniture shopping simple, convenient, and accessible
        to everyone. Our e-commerce platform offers a wide range of household
        furniture products from partnered brands, providing a connection between
        these brands and a broader customer base.
      </p>
    </div>
  );
}

function OurServicesSection() {
  return (
    <section className='flex flex-col gap-[26px] w-[calc(100%-3rem)]'>
      <div className='flex flex-col gap-[12px]'>
        <h2 className='text-[#CDB6B2] text-sm font-extrabold'>
          / OUR SERVICES
        </h2>
        <h3 className='text-[#212121] font-extrabold text-2xl leading-9'>
          A tailored and personalized experience for our customers through
          easy-to-use and unique features, making shopping for furniture a
          breeze.
        </h3>
      </div>
      <p className='text-OuterSpace leading-[24px] text-base'>
        Our platform is designed to cater to all household furniture needs, with
        a wide selection of brands and products all available under one roof.
      </p>
      {/* Cards Carousel */}
      <CardsCarousel
        cards={[
          {
            title: 'Customizable Filters for Convenience',
            description:
              'Enjoy a variety of filter options that they can adjust according to various factors such as brand, category, color, price, and much more.'
          },
          {
            title: 'Effortless Product Visual Discovery',
            description:
              'With our image search option, customers can easily find the same or similar product they are looking for with a click of a button.'
          },
          {
            title: 'Expert Installation and Assembly',
            description:
              'We provide installation/assembling services to make the process even smoother. '
          }
        ]}
      />
    </section>
  );
}

function OurServicesForCustomersSection() {
  return (
    <section className='flex flex-col mx-[1.5rem] gap-[26px]'>
      <div className='flex flex-col gap-[12px]'>
        <h2 className='text-[#CDB6B2] text-sm font-extrabold'>
          / OUR SERVICES FOR CUSTOMERS
        </h2>
        <h3 className='text-[#212121] font-extrabold text-2xl leading-9'>
          Seamless and enjoyable shopping experience for our customers.
        </h3>
      </div>
      <img src={img2} loading='lazy' />
      <p className='text-OuterSpace leading-[24px] text-base'>
        To achieve this, we have included a number of distinctive features on
        both our website and app
      </p>
      <div className='flex flex-col bg-white rounded-[.75rem] py-[1.5rem] px-[.75rem] gap-[.875rem] shadow-[0px_12px_26px_rgba(0,0,0,0.1)]'>
        <span className='flex items-center justify-center w-[3.125rem] aspect-square rounded-full shadow-[0px_2px_6px_rgba(0,0,0,0.25)]'>
          <Cart2Svg />
        </span>
        <p className='text-base font-medium'>
          Wide selection of brands and products all available in one place,
          customers can enjoy the convenience of shopping from the comfort of
          their own homes.
        </p>
      </div>
    </section>
  );
}

function OurServicesForPartneredBrandsSection() {
  return (
    <section className='flex flex-col gap-[1.625rem] w-full rounded-[1.5rem] bg-white px-[1.25rem] py-[2.6875rem]'>
      <div className='flex flex-col gap-[.75rem]'>
        <h2 className='text-[#CDB6B2] text-sm font-extrabold'>
          / OUR SERVICES FOR CUSTOMERS
        </h2>
        <h3 className='text-[#212121] font-extrabold text-2xl leading-9'>
          Seamless and enjoyable shopping experience for our customers.
        </h3>
        <img src={img3} loading='lazy' />
      </div>
      <p className='text-OuterSpace leading-[24px] text-base font-medium'>
        Athathy is not just about providing a prominent shopping experience for
        customers. We also offer a range of services to our partnered brands,
        helping them reach their full potential and connecting them with
        customers in a holistic manner.
      </p>
      <div className='flex flex-col gap-[2rem]'>
        <div className='flex flex-col bg-[#F5F5F5] rounded-[.75rem] py-[1.5rem] px-[.75rem] gap-[.875rem] shadow-[0px_12px_26px_rgba(0,0,0,0.1)]'>
          <span className='flex items-center justify-center bg-white w-[3.125rem] aspect-square rounded-full shadow-[0px_2px_6px_rgba(0,0,0,0.1)]'>
            <OverviewSvg />
          </span>
          <p className='text-base font-medium'>
            Our onboarding options offer flexible and customizable solutions,
            making it easy for our partnered brands to join the platform.
          </p>
        </div>
        <div className='flex flex-col bg-[#F5F5F5] rounded-[.75rem] py-[1.5rem] px-[.75rem] gap-[.875rem] shadow-[0px_12px_26px_rgba(0,0,0,0.1)]'>
          <span className='flex items-center justify-center bg-white w-[3.125rem] aspect-square rounded-full shadow-[0px_2px_6px_rgba(0,0,0,0.1)]'>
            <ExtensiveSupportSvg />
          </span>
          <p className='text-base font-medium'>
            Our partnered brands benefit from increased exposure to a larger
            customer base, product management and logistics support, marketing
            and promotional opportunities, and access to valuable data and
            insights about customer interactions with their very own products.
          </p>
        </div>
      </div>
    </section>
  );
}

function FuturePlansAtAthathySection() {
  return (
    <section className='flex flex-col mx-[1.5rem] gap-[26px]'>
      <h3 className='text-[#212121] font-extrabold text-2xl leading-9'>
        Future Plans At Athathy,
      </h3>
      <p className='text-OuterSpace leading-[24px] text-base'>
        We are constantly striving to improve our services and provide the best
        possible experience for our customers and partnered brands. Our future
        plans include expanding our product selection, enhancing our platform
        features, and expanding our reach to new global markets. With our
        commitment to innovation and customer satisfaction, we are confident
        that Athathy will continue to grow and thrive in the years to come.
        Whether you are a furniture store looking for exposure to a wider
        customer base, or a customer searching for the perfect piece of
        furniture, we have got you covered. Our platform offers a tailored and
        personalized experience for all, making furniture shopping simple,
        convenient and accessible.
      </p>
    </section>
  );
}

function CardsCarousel({
  cards
}: {
  cards: { title: string; description: string }[];
}) {
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const onLeftClick = () => {
    const newCardIdx = currentCardIdx - 1;
    if (newCardIdx < 0) return;
    cardsRef.current[newCardIdx].scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
    setCurrentCardIdx(newCardIdx);
  };

  const onRightClick = () => {
    const newCardIdx = currentCardIdx + 1;
    if (newCardIdx >= cards.length) return;
    cardsRef.current[newCardIdx].scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
    setCurrentCardIdx(newCardIdx);
  };

  return (
    <div className='flex flex-col items-center gap-[2.5rem] w-full'>
      <div className='flex gap-[.6875rem] w-full'>
        <button
          className={`flex items-center justify-center w-[4.375rem] aspect-square rounded-full shadow-[0px_2px_6px_rgba(0,0,0,0.25)]
            ${currentCardIdx === 0 ? 'bg-white' : 'bg-black'}
          `}
          onClick={onLeftClick}
        >
          <LeftArrowCompleteSvg
            strokeColor={currentCardIdx === 0 ? '#000000' : '#ffffff'}
          />
        </button>
        <button
          className={`flex items-center justify-center w-[4.375rem] aspect-square rounded-full shadow-[0px_2px_6px_rgba(0,0,0,0.25)]
            ${currentCardIdx === cards.length - 1 ? 'bg-white' : 'bg-black'}
          `}
          onClick={onRightClick}
        >
          <RightArrowCompleteSvg
            strokeColor={
              currentCardIdx === cards.length - 1 ? '#000000' : '#ffffff'
            }
          />
        </button>
      </div>

      <div className='flex gap-[1.4375rem] overflow-x-auto scrollbar-hidden w-full'>
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`flex shrink-0 flex-col gap-[.625rem] py-[1.5rem] px-[.5625rem] bg-white rounded-[.75rem] w-[17.25rem]`}
            ref={(el) => (cardsRef.current[idx] = el as HTMLDivElement)}
          >
            <h3 className='text-sm font-bold'>{card.title}</h3>
            <p className='text-sm'>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
