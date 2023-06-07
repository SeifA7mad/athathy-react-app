import OverallRating from '@src/components/shared/OverallRating';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { fetchVendor } from '@src/services/VendorService';
import { useQuery } from '@tanstack/react-query';
import { Divider, Spin } from 'antd';
import { Link } from 'react-router-dom';

interface SellerProps {
  vendorId: string;
}

const SellerDetails = ({ vendorId }: SellerProps) => {
  const { data: vendorDetails, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.VENDORS, vendorId],
    queryFn: async () => fetchVendor(vendorId),
    initialData: null
  });

  if (isFetching) return <Spin />;

  if (!vendorDetails) return null;

  return (
    <section className='w-full lg:w-[20.438rem] h-40 bg-[#F5F5F5] flex flex-col sm:flex-row gap-y-2 items-center justify-center sm:justify-between py-[1.4375rem] px-[1.5rem] m-auto rounded-3xl shadow-md'>
      <div className='flex w-full flex-col gap-y-2'>
        <h2 className='font-bold text-base text-OuterSpace'>Seller ratings</h2>
        <Link to={`${APP_PREFIX_PATH}/${RouteKeysEnum.vendors}/${vendorId}`}>
          <div className='flex w-full gap-x-3'>
            <img
              src={vendorDetails?.business?.logo}
              alt='Seller'
              loading='lazy'
              className='w-16 h-6 object-scale-down'
            />
            <h3 className='text-lg text-OuterSpace font-bold'>
              {vendorDetails.firstName}
            </h3>
          </div>
        </Link>

        <Divider className='!m-0 border-[1.5px]' dashed />
        <div className='flex gap-x-5'>
          <div className='flex items-center gap-x-1'>
            <OverallRating
              overallRating={vendorDetails?.rating?.overalRating || 0}
            />
            <p className='text-[#FFCD19] font-bold text-sm'>
              {' '}
              {vendorDetails?.rating?.overalRating || 0}/5{' '}
            </p>
          </div>
          <div className='flex flex-col'>
            <h5 className='text-[#30B700] font-bold text-2xl'>
              {' '}
              {vendorDetails?.productSold || 0}{' '}
            </h5>
            <p className='text-[#A0A8AE] font-medium text-xs'>Furniture sold</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerDetails;
