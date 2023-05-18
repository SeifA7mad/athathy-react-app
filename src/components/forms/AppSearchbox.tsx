import { Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';

interface AppSearchboxProps {
  className?: string;
  inputClassName?: string;
}

const AppSearchbox = ({
  className,
  inputClassName
}: AppSearchboxProps): JSX.Element => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFormSubmit = async () => {
    try {
      const { search } = await form.validateFields();

      navigate(`${APP_PREFIX_PATH}/${RouteKeysEnum.products}/search/${search}`);
    } catch (errorInfo) {
      // console.error('Failed:', errorInfo);
    }
  };

  return (
    <Form form={form} className={className}>
      <Form.Item
        rules={[
          {
            required: true
          }
        ]}
        validateStatus='error'
        noStyle={true}
        name={'search'}
      >
        <Input
          onPressEnter={onFormSubmit}
          className={`w-full h-full ${inputClassName} border-turkishRose border-2`}
          prefix={<SearchOutlined className='text-turkishRose' />}
          placeholder='Search for any furniture'
        />
      </Form.Item>
    </Form>
  );
};

export default AppSearchbox;
