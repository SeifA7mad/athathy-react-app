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

interface WriteReviewFormProps {
  children?: JSX.Element;
  productId: string;
}

const border = 'pb-4 border-b-[1px] border-dashed border-[#A0A8AE]';

const rules = {
  rating: [
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
  message: [
    {
      required: true,
      message: 'Please input your review!'
    }
  ]
} satisfies Record<string, Rule[]>;

const WriteReviewForm = ({ children, productId }: WriteReviewFormProps) => {
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
      await addReview({
        files: fileList.map((file) => file.url || '') || undefined,
        itemId: productId,
        message: values.message,
        rating: ratingValue,
        title: 'title'
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
          formItemName='rating'
          label='Overall rating'
          rateValue={ratingValue}
          setRateValue={setRatingValue}
          rules={rules.rating}
        />
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
        <p className='text-sm font-bold text-OuterSpace'>Write your review</p>
        <Form.Item name='message' rules={rules.message}>
          <Input.TextArea className='h-32' showCount maxLength={400} />
        </Form.Item>
      </div>
      <button
        type='submit'
        className='bg-turkishRose w-fit rounded-md py-5 px-20 m-auto font-medium text-base text-white hover:opacity-75'
      >
        Submit
      </button>
    </Form>
  );
};

export default WriteReviewForm;
