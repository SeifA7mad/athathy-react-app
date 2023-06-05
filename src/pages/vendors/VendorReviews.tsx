import MailSvg from '@src/assets/svg/MailSvg';
import PhoneSvg from '@src/assets/svg/PhoneSvg';
import SellerEmailSvg from '@src/assets/svg/SellerEmailSvg';
import SellerPhoneSvg from '@src/assets/svg/SellerPhoneSvg';
import WriteSellerReviewForm from '@src/components/forms/WriteSellerReviewForm';
import ReviewsLayout from '@src/components/page-content/products/details.tsx/ReviewsLayout';
import SellerReviews from '@src/components/page-content/products/details.tsx/SellerReviews';
import OverallRating from '@src/components/shared/OverallRating';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchVendor } from '@src/services/VendorService';
import { useQuery } from '@tanstack/react-query';
import { Divider, Progress, Spin } from 'antd';
import {
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

const VendorReviews = () => {
  const { vendorId } = useParams();

  if (!vendorId) {
    return <Navigate to={`${APP_PREFIX_PATH}/`} />;
  }

  const { data: vendorDetails, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.VENDORS, vendorId],
    queryFn: async () => fetchVendor(vendorId),
    initialData: null,
    enabled: !!vendorId
  });

  const navigate = useNavigate();
  const location = useLocation();

  // const prevPath = location.pathname.split('/').slice(0, -2).join('/');

  return (
    <ReviewsLayout
      onBack={() => navigate(-1)}
      title='About the seller'
    >
      <>
        {isFetching && <Spin />}
        {vendorDetails && !isFetching && (
          <div className='w-full max-w-4xl bg-white rounded-xl py-4 px-3 grid grid-cols-1 lg:grid-cols-[20rem_1fr]'>
            <div className='flex flex-col gap-y-[0.625rem]  p-12 border-r border-r-sauvignon'>
              <img
                src={vendorDetails?.business?.logo || ''}
                alt='vendor'
                loading='lazy'
                className='w-56 h-24 object-cover'
              />
              <div className='flex flex-col'>
                <h3 className='font-bold text-OuterSpace text-2xl'>
                  {vendorDetails.firstName}
                </h3>
                <p className='font-semibold text-sm text-[#A0A8AE]'>
                  Seller since{' '}
                  {new Date(vendorDetails.createdAt * 1000).getFullYear()}
                </p>
              </div>
              <Divider className='!m-0 w-4/5 border' dashed />
              <div className='flex flex-col'>
                <h5 className='text-OuterSpace text-xs font-extrabold'>
                  About the seller
                </h5>
                <p className='text-[#686B6F] font-medium text-xs'>
                  {vendorDetails?.business?.description || ''}
                </p>
              </div>
              <Divider className='!m-0 w-4/5 border' dashed />
              <div className='flex flex-col gap-y-[0.625rem]'>
                <div className='flex flex-col'>
                  <h5 className='text-[#30B700] font-bold text-2xl'>
                    {' '}
                    {vendorDetails?.productSold || 0}{' '}
                  </h5>
                  <p className='font-medium text-xs'>Furniture sold</p>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <p className='text-[#FFCD19] font-bold text-sm'>
                    {' '}
                    {vendorDetails?.rating?.overalRating || 0}/5{' '}
                  </p>
                  <OverallRating
                    overallRating={vendorDetails?.rating?.overalRating || 0}
                  />
                </div>
              </div>
              <Divider className='!m-0 w-4/5 border' dashed />
              <div className='flex flex-col gap-y-3'>
                <div className='flex flex-col'>
                  <h5 className='text-OuterSpace text-xs font-semibold'>
                    On time delivery
                  </h5>
                  <Progress percent={30} strokeColor={'#30B700'} />
                </div>
                <div className='flex flex-col'>
                  <h5 className='text-OuterSpace text-xs font-semibold'>
                    Product as described
                  </h5>
                  <Progress percent={100} strokeColor={'#30B700'} />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-y-6 w-full pl-6'>
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 max-w-[18rem] text-OuterSpace'>
                  <h2 className='font-bold text-sm'>Contact seller</h2>
                  <div className='flex justify-between text-sm font-semibold'>
                    <SellerPhoneSvg />
                    <span>{vendorDetails.phone}</span>
                  </div>
                  <div className='flex justify-between text-sm font-semibold'>
                    <SellerEmailSvg />
                    <span>{vendorDetails.email}</span>
                  </div>
                </div>
                <SellerReviews vendorId={vendorId} />
              </div>
            </div>
          </div>
        )}
      </>
    </ReviewsLayout>
  );
};

export default VendorReviews;
