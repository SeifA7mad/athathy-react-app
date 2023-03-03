import { Divider } from 'antd';
import DealsOfWeekList from './DealsOfWeekList';

const DealsOfWeek = () => {
  return (
    <section
      className={`w-11/12 max-w-[90rem] flex flex-col justify-center items-center gap-y-8`}
    >
      <div className="flex flex-col text-center gap-y-3 max-w-xl">
        <h1 className="font-bold text-4xl text-OuterSpace">
          Deals of the <span className="text-turkishRose">week</span>
        </h1>
        <h2 className="text-whiteSmoke font-semibold text-2xl">
          Grab the best deals on Furniture pieces designed for your comfort!
        </h2>
      </div>
      <Divider className="!m-0 border-turkishRose border-2 rounded !max-w-sm !min-w-0" />
      <DealsOfWeekList />
    </section>
  );
};

export default DealsOfWeek;
