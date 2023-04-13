import OverallRating from '@src/components/shared/OverallRating';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
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
    <section className='mt-16 w-full max-w-3xl h-44 bg-white flex flex-col sm:flex-row gap-y-2 items-center justify-center sm:justify-between px-12 m-auto rounded-3xl shadow-md'>
      <div className='flex flex-col gap-y-2'>
        <div className='flex gap-x-3'>
          <img
            src=''
            alt='Seller'
            loading='lazy'
            className='w-16 h-6 object-scale-down'
          />
          <h3 className='text-lg text-OuterSpace font-bold'>
            {vendorDetails.firstName}
          </h3>
        </div>
        <Divider className='!m-0 border-[1.5px]' dashed />
        <div className='flex gap-x-5'>
          <div className='flex items-center gap-x-1'>
            <OverallRating overallRating={4} />
            <p className='text-[#FFCD19] font-bold text-sm'> 4.4/5 </p>
          </div>
          <div className='flex flex-col'>
            <h5 className='text-[#30B700] font-bold text-2xl'> 203 </h5>
            <p className='text-[#A0A8AE] font-medium text-xs'>Furniture sold</p>
          </div>
        </div>
      </div>
      <Link
        to={'seller-review'}
        className='text-OuterSpace text-sm font-medium bg-sauvignon rounded-sm shadow-sm py-2 px-14 grid place-items-center'
      >
        Write a review on the seller
      </Link>
    </section>
  );
};

export default SellerDetails;
