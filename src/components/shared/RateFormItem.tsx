import { Form, Rate } from 'antd';
import { Rule } from 'antd/es/form';

interface RateFormItemProps {
  label: string;
  formItemName: string;
  isValid: boolean;
  rateValue: number;
  rules: Rule[];
  setRateValue: (value: number) => void;
}

const RateFormItem = ({
  label,
  rules,
  isValid,
  formItemName,
  rateValue,
  setRateValue
}: RateFormItemProps) => {
  return (
    <>
      <p className='text-sm font-bold text-OuterSpace'>{label}</p>
      <Form.Item
        name={formItemName}
        validateStatus={isValid ? 'success' : 'error'}
        rules={rules}
      >
        <div className='w-56 h-14 rounded-xl flex justify-center items-center gap-x-3 border border-sauvignon'>
          <p className='text-xl font-bold text-OuterSpace'>{rateValue}</p>
          <Rate
            allowHalf
            onChange={(value) => setRateValue(value)}
            value={rateValue}
          />
        </div>
      </Form.Item>
    </>
  );
};

export default RateFormItem;
