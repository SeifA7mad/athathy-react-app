import Heading from '../../../shared/Heading';
import DealsOfWeekList from './DealsOfWeekList';

const DealsOfWeek = () => {
  // TODO: Fetch data from API use react-query
  return (
    <section
      className={`w-11/12 max-w-[90rem] flex flex-col justify-center items-center gap-y-8`}
    >
      <Heading
        tile={'Deals of the week'}
        subTitle="Grab the best deals on Furniture pieces designed for your comfort!"
      />
      <DealsOfWeekList />
    </section>
  );
};

export default DealsOfWeek;
