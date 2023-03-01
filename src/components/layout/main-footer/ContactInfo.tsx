import PhoneSvg from '@src/assets/svg/PhoneSvg';
import WhatsAppSvg from '@src/assets/svg/WhatsAppSvg';

const ContactInfo = (): JSX.Element => {
  return (
    <ul className="text-white flex flex-col gap-y-5 whitespace-nowrap">
      <li className=" text-xl font-bold">Contact Info</li>
      <li className="flex gap-x-3">
        <WhatsAppSvg className="w-5 h-5" />
        <p>
          Whats App
          <br />
          +971 123 4567
        </p>
      </li>
      <li className="flex gap-x-3">
        <PhoneSvg className="w-5 h-5" />
        <p>
          Call Us
          <br />
          +971 123 4567
        </p>
      </li>
    </ul>
  );
};

export default ContactInfo;
