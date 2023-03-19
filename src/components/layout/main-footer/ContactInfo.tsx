import PhoneSvg from '@src/assets/svg/PhoneSvg';
import WhatsAppSvg from '@src/assets/svg/WhatsAppSvg';
import AppStoreImage from '@src/assets/images/appStore.png';
import GooglePlayImage from '@src/assets/images/playStore.png';

const ContactInfo = (): JSX.Element => {
  return (
    <ul className='text-white flex flex-col gap-y-5 whitespace-nowrap'>
      <li className=' text-xl font-bold'>Contact Info</li>
      <li className='flex gap-x-3'>
        <WhatsAppSvg className='w-6 h-6' />
        <p>
          Whats App
          <br />
          +971 123 4567
        </p>
      </li>
      <li className='flex gap-x-3'>
        <PhoneSvg className='w-6 h-6' />
        <p>
          Call Us
          <br />
          +971 123 4567
        </p>
      </li>
      <li className='flex flex-col gap-y-5'>
        <h4 className='font-semibold text-xl'>Download App</h4>
        <div className='flex gap-x-5'>
          <img
            alt='store'
            src={AppStoreImage}
            loading='lazy'
            className='w-28 h-10 object-scale-down cursor-pointer'
          />
          <img
            alt='store'
            src={GooglePlayImage}
            loading='lazy'
            className='w-28 h-10 object-scale-down cursor-pointer'
          />
        </div>
      </li>
    </ul>
  );
};

export default ContactInfo;
