import ClearanceDeals from '@src/components/page-content/home/clearance-deals.tsx';
import DealsOfWeek from '@src/components/page-content/home/deals-of-week.tsx';
import MainBanner from '@src/components/page-content/home/main-banner.tsx';
import NewArrivals from '@src/components/page-content/home/new-arrivals.tsx';
import SubBanners from '@src/components/page-content/home/sub-banner.tsx';
import TopCategories from '@src/components/page-content/home/top-categories.tsx';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchHomeListingWidgetsWeb } from '@src/services/WidgetService';
import { HomeListing, ListingItemsType } from '@src/types/API/WidgetType';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useCallback, useMemo } from 'react';

const HomePage = () => {
  const { data: listingData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.HOME_WIDGETS],
    queryFn: async () => fetchHomeListingWidgetsWeb(),
    initialData: []
  });

  // const listingDataSorted: HomeListing[] = useMemo(
  //   () => [...listingData].sort((a, b) => a.priority - b.priority),
  //   [listingData]
  // );

  const renderWidget = useCallback((widget: HomeListing) => {
    if (widget.listingType === 'MainBanner') {
      return (
        <MainBanner
          key={widget.id}
          bannersData={widget.listingItems as ListingItemsType['MainBanner'][]}
        />
      );
    }

    if (widget.listingType === 'ProductTemplates') {
      return (
        <ClearanceDeals
          key={widget.id}
          title={widget.isTitleShow ? widget.tabTitle : undefined}
          productTemplates={
            widget.listingItems as ListingItemsType['ProductTemplates'][]
          }
        />
      );
    }

    if (widget.listingType === 'Banner') {
      return (
        <SubBanners
          banners={widget.listingItems as ListingItemsType['Banner'][]}
          key={widget.id}
        />
      );
    }

    if (widget.listingType === 'Categories') {
      return (
        <TopCategories
          categories={widget.listingItems as ListingItemsType['Categories'][]}
          key={widget.id}
          title={widget.isTitleShow ? widget.tabTitle : 'Top Categories'}
        />
      );
    }

    return null;
  }, []);

  return (
    <div className='w-full h-full flex flex-col gap-y-20 place-items-center mb-32'>
      {isFetching && <Spin />}
      {!isFetching && listingData.map((widget) => renderWidget(widget))}
      {/* <MainBanner />
      <DealsOfWeek />
      <NewArrivals />
      <ClearanceDeals />
      <TopCategories /> */}
    </div>
  );
};

export default HomePage;
