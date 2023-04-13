import { Form, Rate } from 'antd';
import { Rule } from 'antd/es/form';

interface RateFormItemProps {
  label: string;
  formItemName: string;
  rules: Rule[];
  rateValue: number;
  setRateValue: (value: number) => void;
}

const RateFormItem = ({
  label,
  rules,
  formItemName,
  rateValue,
  setRateValue
}: RateFormItemProps) => {
  return (
    <>
      <p className='text-sm font-bold text-OuterSpace'>{label}</p>
      <Form.Item rules={rules} name={formItemName}>
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
