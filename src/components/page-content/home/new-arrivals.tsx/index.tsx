import { RightOutlined } from '@ant-design/icons';
import ArrowLink from '@src/components/UI/ArrowLink';
import { Link } from 'react-router-dom';
import ProductImage1 from '@src/assets/images/products/2.png';
import ProductImage2 from '@src/assets/images/products/3.png';

const DescriptionComponent = () => (
  <div className="w-full lg:w-48 flex flex-col gap-y-7 place-items-center text-center lg:text-left">
    <h3 className="font-bold text-4xl text-OuterSpace">
      New <span className="text-turkishRose">Arrivals</span>
    </h3>
    <p className="font-medium text-lg text-whiteSmoke">
      Lorem ipsum dolor sit amet consectetur. Vehicula cras lectus convallis sit
      hendrerit.
    </p>
    <button
      type="button"
      className={`bg-white w-16 h-16 rounded-full border-4 border-sauvignon 
          flex place-items-center justify-center text-turkishRose
          text-lg`}
    >
      <RightOutlined />
      {''}
    </button>
  </div>
);

const ProductComponent1 = () => (
  <div className="bg-white rounded-3xl w-96 h-96 relative pt-8 pl-6">
    <Link to={''} className="font-bold text-OuterSpace text-2xl">
      Chairs
      <ArrowLink className="w-36" />
    </Link>
    <img
      src={ProductImage1}
      alt="Product"
      loading="lazy"
      className="w-96 h-80 object-scale-down"
    />
  </div>
);

const ProductComponent2 = () => (
  <div className="bg-white rounded-3xl w-full max-w-[43rem] h-96 relative pt-8 pl-12 flex justify-between overflow-hidden">
    <div className="flex flex-col gap-y-14">
      <Link to={''} className="font-bold text-OuterSpace text-2xl">
        Tables
        <ArrowLink className="w-52" />
      </Link>
      <h1 className="w-52 font-bold text-4xl text-OuterSpace">
        High Quality Furnitures
      </h1>
    </div>
    <img
      src={ProductImage2}
      alt="Product"
      loading="lazy"
      className="w-full h-72 mt-auto object-scale-down"
    />
  </div>
);

const NewArrivals = () => {
  return (
    <section
      className={`w-11/12 max-w-[90rem] ml-0 lg:ml-auto xl:ml-0 flex flex-col lg:flex-row gap-9 justify-between items-center mt-20`}
    >
      <DescriptionComponent />
      <div className="flex gap-x-5">
        <ProductComponent1 />
        <ProductComponent2 />
      </div>
    </section>
  );
};

export default NewArrivals;
