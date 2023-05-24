import { LoadingOutlined } from '@ant-design/icons';
import UploadSvg from '@src/assets/svg/UploadSvg';
import useUpload from '@src/hooks/useUpload';
import { addVendorReview } from '@src/services/VendorReviewsService';
import { Form, Input, Upload, notification } from 'antd';
import { Rule } from 'antd/es/form';
import { useState } from 'react';
import RateFormItem from '../shared/RateFormItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/hooks/redux-hook';
import { APP_PREFIX_PATH, UNAUTHENTICATED_ENTRY } from '@src/configs/AppConfig';

interface WriteReviewFormProps {
  children?: JSX.Element;
  vendorId: string;
}

const border = 'pb-4 border-b border-[#A0A8AE]';

const rules = {
  vendorRating: [
    {
      required: false,
      message: ''
    }
  ],
  files: [
    {
      required: false,
      message: ''
    }
  ],
  vendorMessage: [
    {
      required: true,
      message: 'Please input your review!'
    }
  ]
} satisfies Record<string, Rule[]>;

const UploadButton = ({ loading }: { loading: boolean }) =>
  loading ? <LoadingOutlined /> : <UploadSvg className='w-6 h-6' />;

const WriteSellerReviewForm = ({
  children,
  vendorId
}: WriteReviewFormProps) => {
  const [form] = Form.useForm();
  const [ratingValue, setRatingValue] = useState(1);

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
      await addVendorReview({
        message: values.vendorMessage,
        rating: ratingValue,
        files: fileList?.map((file) => file.url || '') || undefined,
        title: 'title',
        vendorId
      });
      notification.success({
        message: 'Review added successfully'
      });
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);
      notification.warning({
        message: 'Already reviewed this seller'
      });
    }
  };

  return (
    <Form
      form={form}
      onSubmitCapture={onFinish}
      className='w-full flex flex-col gap-y-4 bg-white rounded-xl'
    >
      <div className={`${border} flex flex-col gap-y-2`}>
        <RateFormItem
          formItemName='vendorRating'
          label='Rate seller'
          rateValue={ratingValue}
          setRateValue={setRatingValue}
          rules={rules.vendorRating}
          isValid={ratingValue > 0 && ratingValue <= 5}
        />
      </div>
      <div className={`${border}`}>{children}</div>
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
          Share you thoughts on the seller.
        </p>
        <Form.Item name='vendorMessage' rules={rules.vendorMessage}>
          <Input.TextArea className='h-32' showCount maxLength={400} />
        </Form.Item>
      </div>
      <button
        type='submit'
        className='bg-turkishRose w-fit rounded-md py-5 px-20 font-medium text-base text-white hover:opacity-75'
      >
        Submit
      </button>
    </Form>
  );
};

export default WriteSellerReviewForm;
