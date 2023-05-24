import BannerFour from '@src/components/page-content/home/banner-four.tsx/banner-four';
import BannerThree from '@src/components/page-content/home/banner-three.tsx/banner-three';
import BannerTwo from '@src/components/page-content/home/banner-two.tsx/banner-two';
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

  console.log(listingData);

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

    if (widget.listingType === 'Banner Two') {
      return (
        <BannerTwo
          banners={widget.listingItems as ListingItemsType['Banner'][]}
          key={widget.id}
        />
      );
    }

    if (widget.listingType === 'Banner Three') {
      return (
        <BannerThree
          banners={widget.listingItems as ListingItemsType['Banner'][]}
          key={widget.id}
        />
      );
    }

    if (widget.listingType === 'Banner Four') {
      return (
        <BannerFour
          banners={widget.listingItems as ListingItemsType['Banner'][]}
          key={widget.id}
        />
      );
    }

    // if (widget.listingType === 'Banner') {
    //   return (
    //     <SubBanners
    //       banners={widget.listingItems as ListingItemsType['Banner'][]}
    //       key={widget.id}
    //     />
    //   );
    // }

    if (widget.listingType === 'Categories') {
      return (
        <TopCategories
          categories={
            widget.listingItems.slice(0, 8) as ListingItemsType['Categories'][]
          }
          key={widget.id}
          title={widget.isTitleShow ? widget.tabTitle : 'Shop by Category'}
        />
      );
    }

    return null;
  }, []);

  return (
    <div className='w-full h-full flex flex-col gap-y-11 place-items-center mb-32'>
      {isFetching && <Spin />}
      {!isFetching && listingData.map((widget) => renderWidget(widget))}
      {/* <NewArrivals /> */}
    </div>
  );
};

export default HomePage;
