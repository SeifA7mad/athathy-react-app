import ClearanceDeals from '@src/components/page-content/home/clearance-deals.tsx';
import DealsOfWeek from '@src/components/page-content/home/deals-of-week.tsx';
import MainBanner from '@src/components/page-content/home/main-banner.tsx';
import NewArrivals from '@src/components/page-content/home/new-arrivals.tsx';

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-20 place-items-center">
      <MainBanner />
      <DealsOfWeek />
      <NewArrivals />
      <ClearanceDeals />
    </div>
  );
};

export default Home;
