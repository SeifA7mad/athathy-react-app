import AdditionalProductList from '@src/components/shared/AdditionalProductList';

const AdditionalProducts = () => {
  return (
    <div className='w-11/12 max-w-[90rem] flex flex-col gap-y-36'>
      <AdditionalProductList
        tile='Grab the best deal on Furniture'
        viewAllLink=''
        fetchProducts={() => {}}
      />
      <AdditionalProductList
        tile='Clearance deals on  Furniture'
        viewAllLink=''
        fetchProducts={() => {}}
      />
    </div>
  );
};

export default AdditionalProducts;
