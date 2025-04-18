import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ReplaceSvg from '@src/assets/svg/ReplaceSvg';
import ReturnSvg from '@src/assets/svg/ReturnSvg';
import useUpload from '@src/hooks/useUpload';
import { returnOrderItem } from '@src/services/OrdersService';
import { OrderItemType } from '@src/types/API/OrdersType';
import { useMutation } from '@tanstack/react-query';
import { Select, Steps, Upload, message, notification } from 'antd';
import { useMemo, useState } from 'react';
import ConfirmationModal from '../modals/ConfirmationModal';
import OrderItem from '../shared/OrderItem';
import UploadButton from '../shared/UploadButton';

interface ReturnOrderFormProps {
  order: OrderItemType;
  onFinish: () => void;
}

const btnClass = `w-36 h-10 rounded-md bg-sauvignon text-sm text-[#A0A8AE] flex items-center justify-center gap-x-1`;
const btn1Class = `flex flex-col items-center justify-center text-sm font-semibold text-turkishRose rounded-2xl w-52 h-28 border-[2.5px] border-dashed border-turkishRose`;

const remarksOptions = [
  'Item is damaged',
  'Item is not as described',
  'Item is not as expected',
  'Item is not as shown in the picture'
];

const ReturnOrderForm = ({ order, onFinish }: ReturnOrderFormProps) => {
  const [returnQuantity, setReturnQuantity] = useState(1);
  const [returnMode, setReturnMode] = useState<'RETURN' | 'REPLACEMENT' | null>(
    null
  );
  const [remarks, setRemarks] = useState<string>('');

  const [currentStep, setCurrentStep] = useState<number>(0);

  const {
    beforeUpload,
    fileList,
    handleUpload,
    isLoading: isFilesLoading,
    onRemoveFileHandler
  } = useUpload();

  const { mutateAsync: returnOrder } = useMutation({
    mutationFn: async ({
      id,
      values
    }: {
      id: string;
      values: Parameters<typeof returnOrderItem>[1];
    }) => returnOrderItem(id, values)
  });

  const {
    ModalComponent: ConfirmModalComponent,
    toggleModal: toggleConfirmationModal
  } = ConfirmationModal();

  const onFormSubmit = async () => {
    try {
      message.loading('Processing request...', 0);

      if (!returnMode || !returnQuantity || !remarks) {
        throw new Error();
      }

      await returnOrder({
        id: order.orderId,
        values: {
          returnQuantity: returnQuantity,
          returnMode: returnMode,
          remark: remarks,
          itemIds: [order.id],
          refundMode: 'WALLET',
          images: fileList.map((file) => file.url || '') || undefined
        }
      });
      toggleConfirmationModal(true);
    } catch (errorInfo: any) {
      console.error('Failed:', errorInfo);
      notification.error({
        message: 'Failed to return order'
      });
    } finally {
      message.destroy();
      onFinish();
    }
  };

  const steps = useMemo(
    () => [
      {
        title: 'Select item',
        content: (
          <OrderItem
            className='bg-white w-fit flex flex-col m-auto rounded-3xl  md:w-full md:flex-row md:items-center justify-between py-2 px-4 pr-5 border border-dashed border-[#818589]'
            orderItem={order}
            orderCreatedAt={order.orderedAt}
            controls={
              <Select
                value={returnQuantity}
                onChange={(val) => setReturnQuantity(val)}
              >
                {[...Array(order.returnQuantity)].map((_, i) => (
                  <Select.Option key={i} value={i + 1}>
                    {i + 1}
                  </Select.Option>
                ))}
              </Select>
            }
          />
        )
      },
      {
        title: 'Choose how to return',
        content: (
          <div className='flex m-auto gap-x-11 items-center'>
            <button
              className={`${btn1Class} ${
                returnMode === 'RETURN' && 'bg-sauvignon'
              }`}
              type='button'
              onClick={() => setReturnMode('RETURN')}
            >
              <ReturnSvg className='w-7 h-9' />
              Refund
            </button>

            <p className='font-bold text-lg text-[#A0A8AE]'>or</p>
            <button
              className={`${btn1Class} ${
                returnMode === 'REPLACEMENT' && 'bg-sauvignon'
              }`}
              type='button'
              onClick={() => setReturnMode('REPLACEMENT')}
            >
              <ReplaceSvg className='w-7 h-9 ' />
              Replace
            </button>
          </div>
        )
      },
      {
        title: 'Help us improve our service! ',
        content: (
          <div className='flex flex-col gap-y-5'>
            <div className='w-full flex flex-wrap gap-5 justify-center m-auto'>
              {remarksOptions.map((remarkItem) => (
                <button
                  onClick={() => setRemarks(remarkItem)}
                  type='button'
                  key={remarkItem}
                  className={`text-base font-semibold text-OuterSpace border border-turkishRose rounded-3xl py-1 px-4 ${
                    remarks === remarkItem && 'bg-sauvignon'
                  }`}
                >
                  {remarkItem}
                </button>
              ))}
            </div>
            <div className='flex flex-col gap-y-2'>
              <label
                htmlFor='files'
                className='text-sm font-bold text-OuterSpace'
              >
                {' '}
                Add a photo or a video{' '}
              </label>
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
            </div>
          </div>
        )
      }
    ],
    [returnMode, remarks, order, fileList, isFilesLoading]
  );

  const items = useMemo(
    () =>
      steps.map((item, i) => ({
        key: 'item.title',
        title: currentStep === i ? item.title : ''
      })),
    [steps, currentStep]
  );

  return (
    <form className='flex flex-col gap-y-6 w-full'>
      <Steps
        labelPlacement='vertical'
        type='default'
        current={currentStep}
        items={items}
        className='w-8/12 m-auto'
      />
      {steps[currentStep].content}
      <div className='flex items-center gap-x-4 m-auto'>
        <button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          className={`${btnClass} ${
            currentStep > 0 ? '!font-semibold !text-OuterSpace' : 'hidden'
          }`}
          type='button'
        >
          <LeftOutlined className='text-xs leading-3' /> Back
        </button>
        <button
          onClick={() => setCurrentStep((prev) => prev + 1)}
          className={`${btnClass} ${
            currentStep < steps.length - 1
              ? '!font-semibold !text-OuterSpace'
              : 'hidden'
          }`}
          type='button'
          disabled={
            (currentStep === 0 && !returnQuantity) ||
            (currentStep === 1 && !returnMode)
          }
        >
          Next <RightOutlined className='text-xs leading-3' />
        </button>
        <button
          onClick={onFormSubmit}
          className={`${btnClass} ${
            currentStep === steps.length - 1
              ? '!font-semibold !text-OuterSpace'
              : 'hidden'
          }`}
          disabled={!remarks}
          type='button'
        >
          Confirm
        </button>
      </div>
      <ConfirmModalComponent
        confirmationTxt='Return Confirmed'
        confirmationSubTxt='Check return page to see status of your request'
      />
    </form>
  );
};

export default ReturnOrderForm;
