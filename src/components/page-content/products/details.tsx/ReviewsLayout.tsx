import BackButton from '@src/components/shared/BackButton';

interface WriteReviewFormProps {
  children?: JSX.Element;
  title: string;
}
const ReviewsLayout = ({ children, title }: WriteReviewFormProps) => {
  return (
    <section className='flex flex-col gap-y-5 w-11/12 m-auto max-w-4xl relative mt-11 mb-24'>
      <h3 className='font-bold text-lg text-OuterSpace'> {title} </h3>
      {children}

      <BackButton className='absolute -left-32' />
    </section>
  );
};

export default ReviewsLayout;
