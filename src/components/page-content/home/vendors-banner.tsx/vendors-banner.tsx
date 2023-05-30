import ViewAllLink from '@src/components/UI/ViewAllLink';
import Heading from '../../../shared/Heading';

import { ListingItemsType } from '@src/types/API/WidgetType';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';

import VendorCard from './vendor-card';

interface VendorsBannerProps {
  vendors: ListingItemsType['Vendors'][];
  title?: string;
}

const VendorsBanner = ({ vendors, title }: VendorsBannerProps) => {
  return (
    <section className='w-11/12 max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem] flex flex-col justify-center items-center gap-y-11'>
      {title && (
        <div className='flex justify-between items-center'>
          <Heading tile={title} wrapperClassName='!items-start' />
        </div>
      )}

      <div className='relative w-full grid grid-flow-row grid-cols-4 gap-4'>
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            id={vendor.id}
            name={vendor.business.name}
            image={
              vendor.business.logo ??
              'https://logowik.com/content/uploads/images/527_ikea.jpg'
            }
          />
        ))}
      </div>
      <ViewAllLink to={`${APP_PREFIX_PATH}`} />
    </section>
  );
};

export default VendorsBanner;
