import MailSvg from '@src/assets/svg/MailSvg';
import PhoneSvg from '@src/assets/svg/PhoneSvg';
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
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';

interface SellerReviewProps {
  vendorId: string;
}

const SellerReview = ({ vendorId }: SellerReviewProps) => {
  const { data: vendorDetails, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.VENDORS, vendorId],
    queryFn: async () => fetchVendor(vendorId),
    initialData: null,
    enabled: !!vendorId
  });

  const navigate = useNavigate();
  const location = useLocation();

  const prevPath = location.pathname.split('/').slice(0, -2).join('/');

  return (
    <ReviewsLayout
      onBack={() => navigate(`${APP_PREFIX_PATH}${prevPath}`)}
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
                className='w-56 h-24 object-contain'
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
                  <p className='text-[#FFCD19] font-bold text-sm'> 4.4/5 </p>
                  <OverallRating overallRating={4} />
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
              <div className='flex gap-x-5'>
                <NavLink
                  to={'add-review'}
                  className={({ isActive }) =>
                    `font-bold text-sm text-[#A0A8AE] ${
                      isActive
                        ? '!text-OuterSpace border-b border-b-turkishRose'
                        : ''
                    }`
                  }
                >
                  Add review
                </NavLink>
                <NavLink
                  to={'other-reviews'}
                  className={({ isActive }) =>
                    `font-bold text-sm text-[#A0A8AE] ${
                      isActive
                        ? '!text-OuterSpace border-b border-b-turkishRose'
                        : ''
                    }`
                  }
                >
                  Other reviews
                </NavLink>
              </div>
              <div>
                <Routes>
                  <Route path='/' element={<Navigate to={'add-review'} />} />
                  <Route
                    path={'/add-review'}
                    element={
                      <WriteSellerReviewForm vendorId={vendorId}>
                        <div className='flex flex-col gap-y-4 w-1/2'>
                          <h5 className='text-OuterSpace text-sm font-bold'>
                            Contact seller
                          </h5>
                          <div className='flex justify-between w-full'>
                            <PhoneSvg className='w-5 h-5 !fill-turkishRose' />
                            <p className='text-OuterSpace font-medium text-sm'>
                              {' '}
                              {vendorDetails.phone}{' '}
                            </p>
                          </div>
                          <div className='flex justify-between w-full'>
                            <MailSvg className='w-5 h-5 !fill-turkishRose' />
                            <p className='text-OuterSpace font-medium text-sm'>
                              {' '}
                              {vendorDetails.email}{' '}
                            </p>
                          </div>
                        </div>
                      </WriteSellerReviewForm>
                    }
                  />
                  <Route
                    path={'/other-reviews'}
                    element={<SellerReviews vendorId={vendorId} />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </>
    </ReviewsLayout>
  );
};

export default SellerReview;
