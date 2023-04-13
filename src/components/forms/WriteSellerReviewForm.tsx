import useUpload from '@src/hooks/useUpload';
import { Form, Input, Upload, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import UploadSvg from '@src/assets/svg/UploadSvg';
import { useState } from 'react';
import { Rule } from 'antd/es/form';
import { addReview } from '@src/services/ReviewsService';
import RateFormItem from '../shared/RateFormItem';

interface WriteReviewFormProps {
  children?: JSX.Element;
  productId: string;
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
  productId
}: WriteReviewFormProps) => {
  const [form] = Form.useForm();
  const [ratingValue, setRatingValue] = useState(1);

  const {
    beforeUpload,
    fileList,
    handleUpload,
    isLoading: isFilesLoading,
    onRemoveFileHandler
  } = useUpload();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      await addReview({
        itemId: productId,
        message: '',
        rating: 0,
        orderId: productId,
        title: 'title',
        vendorTitle: 'vendorTitle',
        vendorMessage: values.vendorMessage,
        vendorRating: ratingValue,
        vendorFiles: fileList.map((file) => file.url || '') || undefined
      });
      notification.success({
        message: 'Review added successfully'
      });
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);
      notification.error({
        message: 'Failed to add review'
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
