import { uploadFiles } from '@src/services/UploadFileService';
import { notification } from 'antd';
import { RcFile, UploadFile } from 'antd/es/upload';
import { useState } from 'react';

  

const useUpload = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const setFileListHandler = (url: string) => {
    if (!url) return;
    setFileList(prev => [
      ...prev,
        {
          uid: `${prev.length + 1}`,
          name: 'image.png',
          status: 'done',
          url: url
        }
    ]);
  };

  const onRemoveFileHandler = (file: UploadFile) => {
    setFileList(prev => prev.filter(item => item.uid !== file.uid));
  };

  const beforeUpload = (file: RcFile) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    // return isJpgOrPng && isLt2M;
    return true;
  };

  const handleUpload = async (file: string | Blob | RcFile) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('files', file as Blob);
      formData.append("imageCategoryId", "d7d2e79f-8f30-46b9-8da5-91d2d841b4ba");
      const files = await uploadFiles(formData);
  
      if (files) {
        setFileListHandler(files[0].original);
      }
    } catch (error) {
      notification.error({
        message: 'Error uploading file',
      })
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fileList,
    isLoading,
    handleUpload,
    beforeUpload,
    setFileListHandler,
    onRemoveFileHandler
  };
};

export default useUpload;
