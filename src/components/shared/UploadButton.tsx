import { LoadingOutlined } from '@ant-design/icons';
import UploadSvg from '@src/assets/svg/UploadSvg';

const UploadButton = ({ loading }: { loading: boolean }) =>
  loading ? <LoadingOutlined /> : <UploadSvg className='w-6 h-6' />;

export default UploadButton;
