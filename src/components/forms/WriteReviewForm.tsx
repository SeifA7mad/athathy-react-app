import useUpload from '@src/hooks/useUpload';
import { addReview } from '@src/services/ReviewsService';
import { Form, Input, Upload, notification } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';
import RateFormItem from '../shared/RateFormItem';
import UploadButton from '../shared/UploadButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/hooks/redux-hook';
import { APP_PREFIX_PATH, UNAUTHENTICATED_ENTRY } from '@src/configs/AppConfig';
import LikeOutlinedSvg from '@src/assets/svg/LikeOutlinedSvg';
import DislikeOutlinedSvg from '@src/assets/svg/DislikeOutlinedSvg';
import LikeFilledSvg from '@src/assets/svg/LikeFilledSvg';
import DislikeFilledSvg from '@src/assets/svg/DislikeFilledSvg';

interface WriteReviewFormProps {
  children?: JSX.Element;
  productId: string;
  orderId: string;
}

const border = 'pb-4 border-b-[1px] border-dashed border-[#A0A8AE]';

const rules = {
  overallRating: [
    {
      message: 'Please enter your overall rating!'
    }
  ],
  sellerRating: [
    {
      message: 'Please enter your seller rating!'
    }
  ],
  files: [
    {
      required: false,
      message: ''
    }
  ],
  message: [
    {
      required: true,
      message: 'Please input your item review!'
    }
  ],
  sellerMessage: [
    {
      required: true,
      message: 'Please input your seller review!'
    }
  ]
} satisfies Record<string, Rule[]>;

const WriteReviewForm = ({
  children,
  productId,
  orderId
}: WriteReviewFormProps) => {
  const [form] = Form.useForm();
  const [overallRatingValue, setOverallRatingValue] = useState(1);
  const [sellerRatingValue, setSellerRatingValue] = useState(1);
  const [isItemAsDescribed, setIsItemAsDescribed] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const fallbackPath = location.pathname.slice(1).split('/');

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const {
    beforeUpload,
    fileList,
    handleUpload,
    isLoading: isFilesLoading,
    onRemoveFileHandler
  } = useUpload();

  const onFinish = async () => {
    if (!isLoggedIn) {
      navigate(`${APP_PREFIX_PATH}/${fallbackPath}/${UNAUTHENTICATED_ENTRY}`);
      return;
    }

    try {
      const values = await form.validateFields();
      await addReview({
        orderId: orderId,
        itemId: productId,
        files: fileList.map((file) => file.url || '') || undefined,
        message: values.message,
        rating: overallRatingValue,
        itemAsDescribed: isItemAsDescribed,
        title: 'title',
        vendorRating: sellerRatingValue,
        vendorMessage: values.sellerMessage
      });
      notification.success({
        message: 'Review added successfully'
      });
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);

      if (errorInfo?.response?.status === 422) {
        notification.warning({
          message: 'Already reviewed'
        });
      }
    }
  };

  return (
    <Form
      form={form}
      onSubmitCapture={onFinish}
      className='w-full p-8 flex flex-col gap-y-4 bg-white rounded-xl'
    >
      <div className={`${border}`}>{children}</div>
      <div className={`${border} flex flex-col gap-y-2`}>
        <RateFormItem
          formItemName='overallRating'
          label='Overall rating'
          rateValue={overallRatingValue}
          setRateValue={setOverallRatingValue}
          rules={rules.overallRating}
          isValid={overallRatingValue >= 0 && overallRatingValue <= 5}
        />
        <RateFormItem
          formItemName='sellerRating'
          label='Rate seller'
          rateValue={sellerRatingValue}
          setRateValue={setSellerRatingValue}
          rules={rules.sellerRating}
          isValid={sellerRatingValue >= 0 && sellerRatingValue <= 5}
        />
      </div>
      <div className={`${border} flex gap-4 items-center`}>
        <span className='text-sm font-bold'>
          Item as described by the seller
        </span>
        <span
          className='cursor-pointer'
          onClick={() => setIsItemAsDescribed(true)}
        >
          {isItemAsDescribed ? <LikeFilledSvg /> : <LikeOutlinedSvg />}
        </span>
        <span
          className='cursor-pointer'
          onClick={() => setIsItemAsDescribed(false)}
        >
          {isItemAsDescribed ? <DislikeOutlinedSvg /> : <DislikeFilledSvg />}
        </span>
      </div>
      <div className={`${border} flex flex-col gap-y-2`}>
        <p className='text-sm font-bold text-OuterSpace'>
          Add a photo or a video
        </p>
        <Form.Item rules={rules.files} name='files'>
          <Upload
            name='files'
            listType='picture-card'
            className='avatar-uploader'
            beforeUpload={beforeUpload}
            customRequest={({ file }) => handleUpload(file)}
            fileList={fileList}
            onRemove={onRemoveFileHandler}
            showUploadList={{
              showPreviewIcon: false
            }}
          >
            {<UploadButton loading={isFilesLoading} />}
          </Upload>
        </Form.Item>
      </div>
      <div className={`${border} flex flex-col gap-y-2`}>
        <p className='text-sm font-bold text-OuterSpace'>
          Write your review for the product
        </p>
        <Form.Item name='message' rules={rules.message}>
          <Input.TextArea
            className='h-32'
            prefixCls='ant-input-textarea-review'
            showCount
            maxLength={400}
          />
        </Form.Item>
        <p className='text-sm font-bold text-OuterSpace'>
          Share your thoughts on the seller
        </p>
        <Form.Item name='sellerMessage' rules={rules.sellerMessage}>
          <Input.TextArea
            className='h-32'
            prefixCls='ant-input-textarea-review'
            showCount
            maxLength={400}
          />
        </Form.Item>
      </div>
      <button
        type='submit'
        className='bg-turkishRose w-fit rounded-md py-2 px-20 m-auto font-medium text-base text-white hover:opacity-75'
      >
        Submit
      </button>
    </Form>
  );
};

export default WriteReviewForm;
