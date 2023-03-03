import DealsOfWeek from '@src/components/page-content/home/deals-of-week.tsx';
import MainBanner from '@src/components/page-content/home/main-banner.tsx';

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-20 place-items-center">
      <MainBanner />
      <DealsOfWeek />
    </div>
  );
};

export default Home;
