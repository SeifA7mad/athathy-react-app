import { Modal, Spin } from 'antd';
import { useState } from 'react';
import ForgetPasswordForm from '../forms/ForgetPasswordForm';

interface ForgetPasswordModelProps {
  onClose?: () => void;
}

interface ForgetPasswordModelResponse {
  ModalComponent: (args: ForgetPasswordModelProps) => JSX.Element;
  toggleModal: (show: boolean) => void;
}
const ForgetPasswordModel = ({
  onSubmit
}: {
  onSubmit?: () => void;
}): ForgetPasswordModelResponse => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    FormComponent: ForgetPasswordFormComponent,
    isSubmitting: isForgetPasswordFormSubmitting
  } = ForgetPasswordForm({
    onSubmit: () => {
      setIsModalVisible(false);
      onSubmit && onSubmit();
    }
  });

  const ModalComponent = ({ onClose }: ForgetPasswordModelProps) => (
    <Modal
      className='!w-[45rem]'
      centered={true}
      open={isModalVisible}
      confirmLoading={isForgetPasswordFormSubmitting}
      onCancel={() => {
        setIsModalVisible(false);
        onClose && onClose();
      }}
      footer={null}
    >
      {isForgetPasswordFormSubmitting && (
        <Spin className='!m-auto !w-full !h-full' />
      )}
      <div
        className={`!font-PlusJakartaSans flex flex-col justify-center gap-y-10 w-full h-full text-[#333333] p-0 md:py-6 ${
          isForgetPasswordFormSubmitting && 'hidden'
        }`}
      >
        <div className='flex flex-col items-center gap-y-5 text-center'>
          <h1 className='font-bold text-4xl'> Reset password </h1>
        </div>
        <ForgetPasswordFormComponent />
      </div>
    </Modal>
  );

  return {
    ModalComponent,
    toggleModal: (show) => setIsModalVisible(show)
  };
};

export default ForgetPasswordModel;
