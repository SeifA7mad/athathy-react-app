import { Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { search } from '@src/services/SearchService';

interface AppSearchboxProps {
  className?: string;
  inputClassName?: string;
}

const AppSearchbox = ({
  className,
  inputClassName
}: AppSearchboxProps): JSX.Element => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: search
  });

  const [form] = Form.useForm();

  const onFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      // TODO: Implement search logic via API
    } catch (errorInfo) {
      // console.error('Failed:', errorInfo);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    // Enter
    if (event.code === 'Enter') {
      onFormSubmit();
    }
  };

  return (
    <Form form={form} className={className} onKeyUp={handleKeyUp}>
      <Form.Item
        rules={[
          {
            required: true
          }
        ]}
        validateStatus="error"
        noStyle={true}
        name={'search'}
      >
        <Input
          className={`w-full h-full ${inputClassName}`}
          prefix={<SearchOutlined />}
          placeholder="Search for any furniture"
        />
      </Form.Item>
    </Form>
  );
};

export default AppSearchbox;
